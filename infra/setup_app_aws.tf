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
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allow_app_access" {
  security_group_id = aws_security_group.short_url_app_sg.id
  type              = "ingress"
  from_port         = 3001
  to_port           = 3001
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
  ami               = "ami-0c8e97a27be37adfd"
  instance_type     = "t2.micro"
  key_name          = aws_key_pair.short_url_app_key.key_name
  availability_zone = var.AZ
  subnet_id         = aws_subnet.short_url_subnet.id
  security_groups   = [aws_security_group.short_url_app_sg.id]

  tags = {
    Name = "URL Shortener App"
  }
}

resource "aws_eip" "ip" {
  vpc      = true
  instance = aws_instance.short_url_instance.id

  tags = {
    Name = "URL Shortener Subnet"
  }
}

output "ip" {
  value = aws_eip.ip.public_ip
}

