# Seneca Protocol (version 1) <br/> Activities Microservice

Activities microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8807, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'activities',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [Reference class](#class1)
* [PartyActivity class](#class2)
* [PartyActivityPage class](#class3)
* [cmd: 'get_party_activities'](#operation1)
* [cmd: 'log_party_activity'](#operation2)
* [cmd: 'batch_party_activities'](#operation3)
* [cmd: 'delete_party_activities'](#operation4)

## Data types

### <a name="class1"></a> Reference class

Represents a reference to a particular item specified by id, type and name. 

**Properties:**
- id: string - unique item id
- type: string - item type
- name: string - item name

### <a name="class2"></a> PartyActivity class

Represents a record of a party activity performed in the past. 
Each activity record is related to:
- Party who performed the activity
- Object related to the activity. For instance, object that was create or deleted by the party
- Parent of the related objects. If related object is a part of a bigger hierarchy it helps to collect change history across all child objects
- 3rd party related to the activity. For instance, if 3rd party offered or was offered to share work on specific object

**Properties:**
- id: string - unique record id
- time: Date - date and time when activity took place (default: current time)
- type: string - activity type: 'signup', 'signin', 'created', etc.
- party: Reference - reference to the party who performed the activity
- ref_item: Reference - reference to an item related to this activity
- ref_parties: Reference[] - array of the item parent references to enable hierarchical search
- ref_party: Reference - reference to a 3rd party related to this activity
- details: Object - additional details related to this activity, like % of completion or new status

### <a name="class3"></a> PartyActivityPage class

Represents a paged result with subset of requested PartyActivity objects

**Properties:**
- data: PartyActivity[] - array of retrieved PartyActivity page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_party_activities'

Retrieves a list of party activities by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - type: string - (optional) type of activities
  - include_types: string[] - (optional) array of activities types to include into results
  - exclude_types: string[] - (optional) array of activities types to exclude from results
  - party_id: string - (optional) unique id of party who performed the activity
  - ref_id: string - (optional) unique id of related object
  - parent_id: string - (optional) unique if of parent of related object
  - ref_party_id: string - (optional) unique id of 3rd party
  - start: Date - (optional) start of the time range
  - end: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: PartyActivityPage - retrieved PartyActivity object

### <a name="operation2"></a> Cmd: 'log_party_activity'

Log a single party activity

**Arguments:** 
- activity: PartyActivity - party activity to be logged

**Returns:**
- err: Error - occured error or null for success
- result: PartyActivity - logged party activity

### <a name="operation3"></a> Cmd: 'batch_party_activities'

Log multiple party activities

**Arguments:** 
- activities: PartyActivity[] - array of party activities to be logged

**Returns:**
- err: Error - occured error or null for success

### <a name="operation3"></a> Cmd: 'delete_party_activities'

Deletes party activities that satisfy specified criteria.
This operation is used to clean up the history if party or related objects are removed.

**Arguments:** 
- filter: object - filter parameters
  - type: string - (optional) type of activities
  - include_types: string[] - (optional) array of activities types to include into results
  - exclude_types: string[] - (optional) array of activities types to exclude from results
  - party_id: string - (optional) unique id of party who performed the activity
  - ref_id: string - (optional) unique id of related object
  - parent_id: string - (optional) unique if of parent of related object
  - ref_party_id: string - (optional) unique id of 3rd party
  - start: Date - (optional) start of the time range
  - end: Date - (optional) end of the time range

**Returns:**
- err: Error - occured error or null for success
