terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.region
}

resource "aws_vpc" "short_url_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "URL Shortener VPC"
  }
}

resource "aws_eip" "short_url_eip" {
  vpc              = true
  public_ipv4_pool = "amazon"

  tags = {
    Name = "URL Shortener Elastic IP"
  }
}

resource "aws_eip_association" "short_url_eip_assoc" {
  instance_id   = aws_instance.short_url_instance.id
  allocation_id = aws_eip.short_url_eip.id
}

resource "aws_internet_gateway" "short_url_gw" {
  vpc_id = aws_vpc.short_url_vpc.id

  tags = {
    Name = "URL Shortener GW"
  }
}

resource "aws_route_table" "short_url_rt" {
  vpc_id = aws_vpc.short_url_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.short_url_gw.id
  }

  tags = {
    Name = "URL Shortener RT"
  }
}

resource "aws_subnet" "short_url_subnet" {
  vpc_id                  = aws_vpc.short_url_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = var.AZ
  map_public_ip_on_launch = true

  tags = {
    Name = "URL Shortener Subnet"
  }
}

resource "aws_route_table_association" "short_url_rt_subnet_ass" {
  subnet_id      = aws_subnet.short_url_subnet.id
  route_table_id = aws_route_table.short_url_rt.id
}

resource "aws_security_group" "short_url_app_sg" {
  vpc_id      = aws_vpc.short_url_vpc.id
  name        = "short_url_app_sg"
  description = "URL Shortener App Security Group"
}

resource "aws_security_group_rule" "allow_ssh" {
  security_group_id = aws_security_group.short_url_app_sg.id
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_http" {
  security_group_id = aws_security_group.short_url_app_sg.id
  type              = "ingress"
  from_port         = var.frontend_port
  to_port           = var.frontend_port
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_app_access" {
  security_group_id = aws_security_group.short_url_app_sg.id
  type              = "ingress"
  from_port         = var.backend_port
  to_port           = var.backend_port
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_all_outbound_traffic" {
  security_group_id = aws_security_group.short_url_app_sg.id
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_key_pair" "short_url_app_key" {
  key_name   = "short_url_app_key"
  public_key = file(var.public_key_path)
}

resource "aws_instance" "short_url_instance" {
  ami                         = "ami-0c8e97a27be37adfd"
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.short_url_app_key.key_name
  availability_zone           = var.AZ
  subnet_id                   = aws_subnet.short_url_subnet.id
  security_groups             = [aws_security_group.short_url_app_sg.id]
  associate_public_ip_address = true

  provisioner "local-exec" {
    command     = "./build_app.sh"
    interpreter = ["/bin/bash", "-c"]

    environment = {
      REACT_APP_API_URL = "http://${aws_eip.short_url_eip.public_ip}:${var.backend_port}"
    }
  }

  provisioner "file" {
    source      = "./docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      host        = self.public_ip
      private_key = file(var.private_key_path)
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update -y",
      "sudo apt install -y docker.io",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",
      "sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "sudo docker-compose pull",
      "sudo docker-compose up -d --no-build"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      host        = self.public_ip
      private_key = file(var.private_key_path)
    }
  }

  tags = {
    Name = "URL Shortener App"
  }
}


output "ip" {
  value = aws_eip.short_url_eip.public_ip
}

