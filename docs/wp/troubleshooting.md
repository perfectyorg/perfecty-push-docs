---
title: Troubleshooting
description: Solutions to common problems
---

## Better performance

For better performance we recommend enabling the `gmp` extension (GNU Multiple Precision).

## How to install the gmp extension

In Ubuntu you would do:

```bash
sudo apt-get install php7.2-gmp

# then restart apache with
sudo service apache2 restart

# or php-fpm (nginx)
sudo service php-fpm restart
```

## Cannot generate the VAPID keys automatically

This happens if you have PHP <= 7.2 and miss the `gmp` extension. Perfecty Push will be disabled until you install the `gmp` extension or generate the keys manually.

### 1. Install the gmp extension

Follow the instructions above, and then deactivate/activate the plugin from the WordPress plugin UI. This will generate the keys automatically for you.

### 2. Generating the VAPID keys manually using `openssl`

From your WordPress server run:

```bash
openssl ecparam -genkey -name prime256v1 -out private_key.pem
openssl ec -in private_key.pem -pubout -outform DER|tail -c 65|base64|tr -d '=' |tr '/+' '_-' > public_key.txt
openssl ec -in private_key.pem -outform DER|tail -c +8|head -c 32|base64|tr -d '=' |tr '/+' '_-' > private_key.txt

cat private_key.txt
cat public_key.txt
```

Once you've created the keys, set those values in Perfecty Push > Settings > Vapid Private Key / Vapid Public Key.

**However, the recommended solution is to install and enable the `gmp` extension.**

## The VAPID keys are missing in Perfecty Push. Generate the VAPID keys.

This is due to two reasons:
- You use PHP 7.2 and you didn't have the `gmp` extension enabled, however now you have it.
- You have deleted the VAPID keys from the Settings.

In any case, you can generate them automatically by deactivating/activating your plugin from the WordPress plugin UI (this won't remove your data).

## Conflicts with external Service Workers

Read the section [Conflict Resolution](./conflict-resolution)
