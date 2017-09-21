---
title: Customer SSO
weight: 10
---

# Introduction
___

Customer SSO is a service for customer authentication and authorization. 

## Endpoint
`https://accounts.chat.io/customer`


## Authentication
To obtain a customerID and access token, send request to `GET /auth`. 

`GET https://accounts.chat.io/customer/auth`

In response you will get valid access token(8h live time) and cookies(http-only) - `__lc_cid`, `__lc_cst` for further validation of your identity as a customer. 

## Authorization
To validate a access token use `GET /info` method.

`GET https://accounts.chat.io/customer/info`

Required headers:

* `Authorization` - should contain valid access token.


