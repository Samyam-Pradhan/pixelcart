pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running health checks...'
                sh 'docker compose up -d'
                sh 'sleep 10'
                sh 'curl -f http://localhost:5001/health || exit 1'
                sh 'curl -f http://localhost:5002/health || exit 1'
                sh 'curl -f http://localhost:5003/health || exit 1'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying all services...'
                sh 'docker compose down'
                sh 'docker compose up -d'
                echo 'Deployment complete!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! PixelCart is running.'
        }
        failure {
            echo 'Pipeline failed! Check the logs.'
            sh 'docker compose down'
        }
    }
}