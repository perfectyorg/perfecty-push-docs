---
title: Improve performance
description: How to adjust the self-hosted server to improve performance
---


## Parameters that impact performance

The following parameters are described in [Configuration](./configuration/#6-self-hosted-server) and they influence in the performance of
the Push Server:

- `batch_size`
- `parallel_flushing_size`

**Note:** The default value of `batch_size` has changed since `v1.4.0`, as the plugin now uses a different batching mechanism.
It means that the old default value of `30` was changed to `1500`, and it now has a totally different meaning.

### Adjusting the `batch_size` parameter

If you increase this parameter, the memory used by `wp-cron.php` will increase. The estimated maximum used memory is:

`Max Memory used = Max payload size * Batch size`

Where the maximum payload size by default is `MAX_COMPATIBILITY_PAYLOAD_LENGTH = 3052`.

For example, the default value of `batch_size = 1500` will use `(1500 * 3052 / 1024) / 1024 = 4,36 Megabytes` of RAM.

#### Execution time

The execution is split in multiple cron jobs in case the sending loop time reaches `80%` of the maximum
execution time limit defined by the `php.ini.max_execution_time` option. That parameter is
described at [ini.max-execution-time](https://www.php.net/manual/es/info.configuration.php#ini.max-execution-time).

By splitting the job into multiple cron jobs, the execution time will be longer. This is because of how WP-Cron works.
So if you want to improve performance and gain some more time, consider using a long execution time limit or make it unlimited
for `wp-cron.php`.

### Adjusting the `parallel_flushing_size` parameter

This is the `batchSize` parameter defined in the internal [web-push-php](https://github.com/web-push-libs/web-push-php#batchsize) library.

The default value in the plugin is a low number for maximum compatibility with different server configurations,
however we recommend adjusting it to achieve maximum performance.

For example, a value of `50` means that there will be `50` asynchronous HTTP requests at a given time during
the send of the notifications. This can create high spikes in memory and CPU usage.

You need to be cautious because increasing this number to a high number (bigger than `1.000`), will mean 
potential Out Of Memory errors and weird exceptions in the downstream components.
In any case, **it's recommended to monitor the logs when adjusting this parameter**.

When you use a value that is higher than what your server can handle, you'll see an increase in log entries like these:

```
[27-Aug-2021 19:41:36] WARNING: [pool website.com]
child 4593 said into stderr: "PHP message: ERROR |
Failed to send one notification, error:
cURL error 60: Issuer certificate is invalid.
(see https://curl.haxx.se/libcurl/c/libcurl-errors.html) 
for https://fcm.googleapis.com/fcm/send/XXXXXXXXXXXXXXXXXXXXXXX"
```

## Example

In a DigitalOcean droplet with 2 Gb of RAM and 2vCPU, it can send around `13.801` notifications in `56 seconds`, using the following parameters:

- `batch_size = 15.000`
- `parallel_flushing_size = 200`
- `memory_limit = 256M`
- `max_execution_time = 256`

When the `parallel_flushing_size` was increased to `300`, lots of notifications failed with `cURL error 60` because
the server couldn't handle that amount of concurrent requests.
