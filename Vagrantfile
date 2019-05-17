Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.hostname = "new-leaf"
  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |v|
    v.name = "new-leaf"
    v.memory = 1024
    v.cpus = 2
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provision "ansible_local" do |ansible|
    ansible.install_mode = "pip"
    ansible.galaxy_role_file = "requirements.yml"
    ansible.playbook = "playbook.yml"
  end

end
