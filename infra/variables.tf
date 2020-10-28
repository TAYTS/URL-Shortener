# AWS Variables
variable "region" {
  default = "ap-southeast-1"
}

variable "AZ" {
  default = "ap-southeast-1a"
}

variable "public_key_path" {
  default = ""
}

variable "private_key_path" {
  default = ""
}

# Docker variables
variable "docker_compose_path" {
  default = "./docker-compose.yml"
}

variable "frontend_image_tag" {
  default = "url-shortener-frontend"
}

variable "backend_image_tag" {
  default = "url-shortener-backend"
}

# App config
variable "backend_port" {
  default = 3001
}

variable "frontend_port" {
  default = 80
}
