provider "aws" {
  region = "us-west-2"  # Ersetze dies mit deiner gewünschten Region
}

resource "aws_ssm_parameter" "db_instance_identifier" {
  name  = "/rds/feedback_app/db_instance_identifier"
  type  = "String"
  value = "feedback-app-datenbank"
}

resource "aws_ssm_parameter" "db_master_username" {
  name  = "/rds/feedback_app/db_master_username"
  type  = "String"
  value = "postgres"
}

resource "aws_ssm_parameter" "db_master_password" {
  name  = "/rds/feedback_app/db_master_password"
  type  = "SecureString"
  value = "password"
}

resource "aws_ssm_parameter" "db_name" {
  name  = "/rds/feedback_app/db_name"
  type  = "String"
  value = "feedbackdb"
}