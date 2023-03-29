node('nodejs_runner_14') {
  stage('frontend_checkout') {
         dir ('secsimdevfe') {
         checkout([$class: 'GitSCM', branches: [[name: '*/dev']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg:  [], \
userRemoteConfigs: [[credentialsId: 'admingithub', url: 'git@github.com:Gemini-Solutions/securitysimulation.git', poll: 'false']]])
         }
  }
  stage('Nodejs_Build') {
        container('nodejs-14') {
            dir ('secsimdevfe'){
             sh 'rm -rf package-lock.json'
             sh 'npm cache clean --force'
             sh 'npm install' 
             sh 'npm install -g @angular/cli@13.1.0'
             sh 'ng build'
        }
       }
     }
   }


node('image_builder_trivy') {
  try {
   stage('Build_image') {
            dir ('secsimdevfe') {
              container('docker-image-builder-trivy') {
              withCredentials([usernamePassword(credentialsId: 'docker_registry', passwordVariable: 'docker_pass', usernameVariable: 'docker_user')]) {
              sh 'docker image build -f Dockerfile -t registry-np.geminisolutions.com/securitysimulation_dev/securitysimulation_dev:latest:1.0-$BUILD_NUMBER -t registry-np.geminisolutions.com/securitysimulation_dev/securitysimulation_dev:latest .'
              sh '''docker login -u $docker_user -p $docker_pass https://registry-np.geminisolutions.com'''
              sh 'docker push registry-np.geminisolutions.com/securitysimulation_dev/securitysimulation_dev:latest:1.0-$BUILD_NUMBER'
              sh 'docker push registry-np.geminisolutions.com/securitysimulation_dev/securitysimulation_dev:latest'
              sh 'rm -rf build/'
           }
         }
        }
      }
    stage('Deployment_stage'){
        dir('secsimdevfe'){
          container('docker-image-builder-trivy'){
             kubeconfig(credentialsId: 'KubeConfigCred'){
              sh '/usr/local/bin/kubectl apply -f deployment.yaml -n dev'
              sh '/usr/local/bin/kubectl rollout restart Deployment devfesim -n dev'
             }
          }
        }

      }
  } finally {
     //sh 'echo current_image="registry-np.geminisolutions.com/misui/misui:1.0-$BUILD_NUMBER" > build.properties'
     //archiveArtifacts artifacts: 'build.properties', onlyIfSuccessful: true
  }
 }