# Nix package manager on Fedora Silverblue 

> Credits to [queeup](https://gist.github.com/queeup/1666bc0a5558464817494037d612f094).

- This is a single user install.  
- For multi user install and without changing selinux mode: https://gist.github.com/matthewpi/08c3d652e7879e4c4c30bead7021ff73  
- Please note that these instructions are not offically supported or condoned by Nix and are not guaranteed to always work, but from my testing everything seems to work perfectly fine.  
    
- ### Change SELinux mode to permissive  
  ``` bash
  sudo setenforce Permissive
  sudo sed -i 's/SELINUX=enforcing/SELINUX=permissive/' /etc/selinux/config
  ```
- ### Create the nix directory in a persistent location  
  ``` bash
  sudo mkdir /var/lib/nix
  sudo chown $USER:$USER /var/lib/nix
  ```
- ### `/etc/systemd/system/mkdir-rootfs@.service`  
  ```ini
  [Unit]
  Description=Enable mount points in / for ostree
  ConditionPathExists=!%f
  DefaultDependencies=no
  Requires=local-fs-pre.target
  After=local-fs-pre.target

  [Service]
  Type=oneshot
  ExecStartPre=chattr -i /
  ExecStart=mkdir -p '%f'
  ExecStopPost=chattr +i /
  ```
- ### `/etc/systemd/system/nix.mount`  
  ```ini
  [Unit]
  Description=Nix Package Manager
  DefaultDependencies=no
  After=mkdir-rootfs@nix.service
  Wants=mkdir-rootfs@nix.service
  Before=sockets.target
  After=ostree-remount.service
  BindsTo=var.mount

  [Mount]
  What=/var/lib/nix
  Where=/nix
  Options=bind
  Type=none

  [Install]
  WantedBy=local-fs.target
  ```
- ### Enable and mount the nix mount.
  ``` bash
  # Ensure systemd picks up the newly created units
  sudo systemctl daemon-reload
  # Enable the nix mount on boot.
  sudo systemctl enable nix.mount
  # Mount the nix mount now.
  sudo systemctl start nix.mount
  ```
- ## Install Nix  
    
  ``` bash
  sh <(curl -L https://nixos.org/nix/install) --no-daemon
  ```

- ### Enable bash/fish/zhs completion for nix installed commands
  ```bash
  tee --append $HOME/.bashrc <<EOF
  # Nix Package Manager
  if [ -e $HOME/.nix-profile/etc/profile.d/nix.sh ]; then source $HOME/.nix-profile/etc/profile.d/nix.sh; fi
  if [ -e $HOME/.nix-profile/etc/profile.d/bash_completion.sh ]; then source $HOME/.nix-profile/etc/profile.d/bash_completion.sh; fi
  export XDG_DATA_DIRS="$HOME/.nix-profile/share/:$XDG_DATA_DIRS"
  EOF
  ```

- Links:  
	- https://tecadmin.net/how-to-disable-selinux-on-fedora/  
	- https://gist.github.com/matthewpi/08c3d652e7879e4c4c30bead7021ff73  
	- https://gist.github.com/queeup/26e36c6e3e701c0ba96c17dc5e5251be  
