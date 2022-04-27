@Library('ceiba-jenkins-library') _
pipeline {
  agent {
    label 'Slave_Induccion'
  }

  options {
    	buildDiscarder(logRotator(numToKeepStr: '3'))
 	disableConcurrentBuilds()
  }


  tools {
    jdk 'JDK8_Centos'
  }


  stages{
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
		checkout scm
      }
    }

    stage('NPM Install') {
      steps {
        echo "------------>Installing<------------"
        sh 'npm install'
      }
    }

    stage('Unit Test') {
      steps {
        echo "------------>Testing<------------"
        sh 'npm run test'
      }
    }

    /*stage('Test end-to-end') {
      steps{
        echo "------------>Testing Protractor<------------"
        sh 'npm run e2e'
      }
    }*/

    stage('Static Code Analysis') {
        steps{
            sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba:adn:reservacion-deportiva.front.carlos.caceres',
            sonarName:'''"CeibaADN-ReservacionDeportiva-Front(carlos.caceres)"''',
            sonarPathProperties:'./sonar-project.properties')
        }
    }

    stage('Build') {
     steps {
        echo "------------>Building<------------"
        sh 'npm run build'
      }
    }
  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail (to: 'carlos.caceres@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }

    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
