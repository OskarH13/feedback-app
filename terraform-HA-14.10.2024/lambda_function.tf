resource "aws_lambda_function" "hello_world" {
  function_name = "hello-world-lambda"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"  # Passe dies an die gewünschte Laufzeit an

  filename      = "lambda.zip"  # Name des hochgeladenen Lambda-Pakets

  source_code_hash = filebase64sha256("lambda.zip")

  environment {
    variables = {
      example = "Hello World!"
    }
  }
}