
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.hostname = "new-leaf"
  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |v|
    v.name = "new-leaf"
    v.memory = 1024
    v.cpus = 2
  end

  config.vm.provision :shell, :inline => "sudo rm /etc/localtime && sudo ln -s /usr/share/zoneinfo/America/Los_Angeles /etc/localtime", run: "always"

  config.vm.network "forwarded_port", guest: 3000, host: 3000, id: 'app_http'
  config.vm.network "forwarded_port", guest: 3001, host: 3001, id: 'node_gateway'
  config.vm.network "forwarded_port", guest: 3002, host: 3002, id: 'node_wallet'

  config.vm.provision "ansible_local" do |ansible|
    ansible.galaxy_role_file = "ansible/requirements.yml"
    ansible.playbook = "ansible/playbook.yml"
    ansible.raw_arguments = ["-Dv"]
  end

  config.vm.provision "dev", type: "ansible_local", run: "never" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.raw_arguments = ["-Dv -t dev"]
  end

  config.vm.provision "gcloud", type: "ansible_local", run: "never" do |ansible|
    ansible.playbook = "ansible/gcloud.yml"
    ansible.raw_arguments = ["-D"]
  end

  config.vm.provision "deploy", type: "ansible_local", run: "never" do |ansible|
    ansible.playbook = "ansible/gcloud.yml"
    ansible.raw_arguments = ["-Dv -t deploy -e deploy=true"]
  end

end
