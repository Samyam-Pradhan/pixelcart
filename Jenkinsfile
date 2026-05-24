pipeline {
    agent any

    environment {
        JWT_SECRET = credentials('JWT_SECRET')
        NETWORK_NAME = "pixelcart-pipeline_default"
    }

    stages {
        stage('Cleanup') {
            steps {
                sh 'docker compose down || true'
            }
        }

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
                    echo "Waiting for services to initialize...."
                    sleep 20
                    docker ps
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "===== Running Tests ====="
                    docker network connect pixelcart-pipeline_default jenkins || true
                    echo "Testing Auth Service..."
                    curl -f http://pixelcart-pipeline-auth-service-1:5001/health
                    echo "Testing Product Service..."
                    curl -f http://pixelcart-pipeline-product-service-1:5002/health
                    echo "Testing Order Service..."
                    curl -f http://pixelcart-pipeline-order-service-1:5003/health
                    echo "All tests passed!"
                    docker network disconnect pixelcart-pipeline_default jenkins || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deployment complete - containers running"
                    docker compose ps
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded"
        }
        failure {
            echo "Pipeline failed! Cleaning up...."
            sh 'docker network disconnect pixelcart-pipeline_default jenkins || true'
            sh 'docker compose down || true'
        }
        always {
            echo "Pipeline finished."
        }
    }
}