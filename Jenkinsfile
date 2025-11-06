pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Signed APK') {
            steps {
                dir('android') {
                    sh './gradlew assembleRelease'
                }
            }
        }
    }
    post {
        success {
            archiveArtifacts artifacts: 'android/app/build/outputs/apk/release/app-release.apk', fingerprint: true
        }
    }
}
