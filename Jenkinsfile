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
                sh 'docker compose build'
            }
        }

        stage('Test') {
            steps {

                sh 'docker compose up -d'

                sh '''
                until curl -f http://localhost:5001/health; do
                    sleep 5
                done
                '''

                sh '''
                until curl -f http://localhost:5002/health; do
                    sleep 5
                done
                '''

                sh '''
                until curl -f http://localhost:5003/health; do
                    sleep 5
                done
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'docker compose down || true'
        }
    }
}