### newleaf
A devops-centered approach to deploying your very own piggy-bank tip-jar (for free!).  Ability to
generate personal crypto QR codes.

Goals:

1.  Do not spend any money on the project.
2.  Ability to take cryptocurrency payments.
3.  Implement only "passive" wallet functions (no ability to send coins).
4.  Security lies solely with user.

#### Getting Started (Level 1)
1. Download and install [Vagrant](https://www.vagrantup.com/downloads.html)
3. Download and install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. [Clone](https://help.github.com/en/articles/cloning-a-repository) this repository   
5. Inside repository folder: `vagrant up`
6. Visit [http://localhost:3000](http://localhost:3000)


#### [Google Cloud](https://console.cloud.google.com/) Steps

1.  [Create application]([https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project#creating-a-gcp-project](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project#creating-a-gcp-project)) in google console, make service accounts, assign buckets permissions.
  _Note: this will create a bucket based on project name_
3.  [Create a service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#iam-service-account-keys-create-console) and download the json key.  Name it `auth.json`

#### Getting Started (Level 2)
1.  Install google App Engine SDK and format deployment scripts.  *this requires `auth.json` file to be present*
   `vagrant provision --provision-with gcloud`
2. Iterate app a few times with
  `vagrant provision --provision-with dev`
3.  Deploy the application to google:
  `vagrant provision --provision-with deploy`

#### MISC
- Generating a seed:  `vagrant ssh -c  '/vagrant/ansible/scripts/genSeed.js'`.  Keep this seed safe somewhere and do not shrea it with anyone.
- Verify 3rd party domain: `vagrant ssh -c 'gcloud domains verify DOMAIN'`
