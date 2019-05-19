
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
  config.vm.network "forwarded_port", guest: 3001, host: 3001, id: 'svc_http'

  config.vm.provision "ansible_local" do |ansible|
    ansible.install_mode = "pip"
    ansible.galaxy_role_file = "requirements.yml"
    ansible.playbook = "playbook.yml"
  end

end
