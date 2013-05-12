Beholder
=================

The website change scanning component.

# API calls

## Incoming
Describes the API calls this component will respond to.

``` json
  {
    "url": "/scan",
    "method": "POST",
    "params": {
        "site": <site>,
        "urls": [ <urls> ]
      },
    "response": null
  }
```
This will trigger a scan for site changes of a specific site. All urls given in the array will be scanned.

## Outgoing
Describes the API calls this component will make.

``` json
  {
    "url": "api/sites/<site_id>/urls/<url_id>/scans",
    "method": "POST",
    "params": {
        "time": <scan_occured>,
        "changes": <changes>,
        "beholder": <beholder_id>
      },
    "response": null
  }
```
This will be called after a successful scan. If there was changes to the site, the changes parameter will contain the changes. Otherwise, the same call will be made but without the changes parameter.
