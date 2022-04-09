---
title: Migrate from other providers like OneSignal
---

Perfecty Push can automatically migrate your subscribers from your old provider
without doing any data export/import. You can also do a manual 
migration of your old provider's VAPID keys and subscribers.

## Automatic migration

This will progressively migrate your existing Push subscribers when they visit your website.
You don't need any export/import operation and can take immediate advantage of the plugin. 

It also means that the users that have not visited your website will not be migrated
and will stay with your old provider unless they visit your website.

Steps:

### 1. Deactivate your old provider

You do this by deactivating your old Push provider plugin in `WordPress > Plugins`.

### 2. Activate Remove conflicting workers in Perfecty Push

**NOTE: Be careful in this step if you have an AMP/PWA website.** [Read more](./conflict-resolution/).

Go to `Perfecty Push > Settings > Javascript SDK` and activate the `Remove conflicting workers (Push Services only)`
option.

This will remove automatically your old provider Service Worker, [read how it works](./conflict-resolution/).

### 3. All set!

You're done, your subscribers will be migrated when they visit your website!

## Manual migration

This method requires that you copy your provider's VAPID keys and export its push subscribers information
to later import it into the Perfecty Push database.

The [VAPID keys](https://tools.ietf.org/id/draft-ietf-webpush-vapid-03.html) are the keys used by a
Push Server to identify themselves to send notifications to the users that have been registered.

**NOTE: We recommend you that you test this with a small batch of users to verify it works before doing the complete migration**

Steps:

### 1. Deactivate your old provider

You do this by deactivating your old Push provider plugin in `WordPress > Plugins`.

### 2. Copy your provider VAPID Keys

You need to request the VAPID keys from your provider.

Once you get them, go to `Perfecty Push > Settings > Self-hosted Server` and paste the keys in 
the `VAPID Private Key` and `VAPID Public Key` fields.

### 3. Export your subscribers information

This step depends on your provider. As an example, from OneSignal you will get a CSV with the
columns `id, identifier, web_auth, web_p256`, example: [https://documentation.onesignal.com/reference/csv-export](https://documentation.onesignal.com/reference/csv-export).

### 4. Import your subscribers into Perfecty Push

This step requires a DB import tool compatible with MySQL that populates the plugin user's table with the data you've exported.

The table name for the subscribers has a name like `*_perfecty_push_users`.

The fields to populate in the table are:

- `uuid` is a user UUID v4
- `endpoint` is your user's Push API endpoint
- `key_auth` is the private VAPID key
- `key_p256dh` is the public VAPID key

### 4. Send your notification

You're now ready to send notifications!