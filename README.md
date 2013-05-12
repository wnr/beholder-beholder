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
        "urls": [ <url>, <url>, <url>, ... ]
      },
    "response": null
  }
```
This will trigger a scan for site changes of a specific site. All urls given in the array will be scanned.

``` json
  {
    "url": "/config",
    "method": "UPDATE",
    "params": {
        "api": <url>,
      },
    "response": null
  }
```
This sets the base url of the API which this component will make API calls to.

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

``` json
  {
    "url": "api/sites/<site_id>/urls/<url_id>?fields=(frequency)",
    "method": "GET",
    "response": {
      "frequency": <scan_frequency>
    }
  }
```
This can be called to obtain the scan frequency of a site url.

``` json
  {
    "url": "api/sites/<site_id>/urls/<url_id>/subscriptions?fields=(selector)",
    "method": "GET",
    "response": [ <selector>, <selector>, <selector>, ... ]
  }
```
This will be called to obtain all DOM selectors which shall be scanned for changes within a site.

``` json
  {
    "url": "api/sites/<site_id>/urls/<url_id>/subscriptions",
    "method": "UPDATE",
    "params": {
      "action": "invalidate"
      "selector": <selector>
    }
    "response": null
  }
```
This will be called when a site have changed so that the given subscription selector no longer can be found. This will invalidate all subscriptions with the specified selector.
