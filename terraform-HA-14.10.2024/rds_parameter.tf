# Verwende die Systems Manager (SSM) Parameter
data "aws_ssm_parameter" "db_instance_identifier" {
  name = "/rds/feedback_app/db_instance_identifier"
}

data "aws_ssm_parameter" "db_master_username" {
  name = "/rds/feedback_app/db_master_username"
}

data "aws_ssm_parameter" "db_master_password" {
  name = "/rds/feedback_app/db_master_password"
}

data "aws_ssm_parameter" "db_name" {
  name = "/rds/feedback_app/db_name"
}

# RDS-Instanz konfigurieren
resource "aws_db_instance" "feedback_app_rds" {
  identifier        = data.aws_ssm_parameter.db_instance_identifier.value
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  engine            = "postgres"
  engine_version    = "13"
  username          = data.aws_ssm_parameter.db_master_username.value
  password          = data.aws_ssm_parameter.db_master_password.value
  db_name           = data.aws_ssm_parameter.db_name.value
  publicly_accessible = true
  skip_final_snapshot = true

  # Weitere Einstellungen hier
}