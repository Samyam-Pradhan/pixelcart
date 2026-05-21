pipeline {
    agent any

    environment {
        JWT_SECRET = credentials('JWT_SECRET')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh '''
                    echo "Building Docker images..."
                    docker compose build
                '''
            }
        }

        stage('Start Services') {
            steps {
                sh '''
                    echo "Starting containers..."
                    docker compose up -d

                    echo "Waiting for services to initialize..."
                    sleep 20

                    docker ps
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "===== Running Tests ====="

                    echo "Testing Auth Service..."
                    curl -f http://auth-service:5001/health

                    echo "Testing Product Service..."
                    curl -f http://product-service:5002/health

                    echo "Testing Order Service..."
                    curl -f http://order-service:5003/health

                    echo "Testing Frontend..."
                    curl -f http://frontend:80

                    echo "All tests passed!"
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deployment stage (containers already running via compose)"
                    docker compose ps
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded "
        }

        failure {
            echo "Pipeline failed cleaning up..."
            sh 'docker compose down || true'
        }

        always {
            echo "Cleaning workspace state..."
        }
    }
}