---
title: "Versioning"
weight: 100
---

# Versioning

### Format

`v<major>.<minor>`

examples: `v0.1` `v0.2`

All components of this API have single, common version.

### Endpoints

Our components have different endpoints for every version. For example here is what url with version looks like for customer API:

`api.chat.io/customer/v0.2/<req>`

or if you prefer to point always to recent version (not recomended):

`api.chat.io/customer/<req>`

### Change policy

Before version `1.0` new versions may introduce breaking changes. We don't know already if that policy will hold after `1.0`. We are holding old versions for unknown amount of time. We will add an information that a version is deprecated in this documentation before version removal.