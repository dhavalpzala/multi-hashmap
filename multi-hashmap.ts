export class MultiHashMap {
  private _noOfDimensions: number = 0
  private _dimensions: string[] = []
  private _records = []
  private _indexMaps: { key: string, map: Object }[] = []

  constructor() {
    if (arguments.length === 0) {
      throw new Error('Please provide atleast one dimesion')
    } else {

      const firstArg = arguments[0]

      if (typeof firstArg === 'string') {

        for (let index = 0; index < arguments.length; index++) {
          this._indexMaps.push({
            key: arguments[index],
            map: Object.create(null)
          })
          this._dimensions.push(arguments[index])
        }
        this._noOfDimensions = this._dimensions.length
      } else if (typeof firstArg === 'object') {

        for (let index = 0; index < firstArg.length; index++) {
          this._indexMaps.push({
            key: firstArg[index],
            map: Object.create(null)
          })
          this._dimensions.push(firstArg[index])
        }
        this._noOfDimensions = this._dimensions.length + (typeof arguments[1] === 'object' ? arguments[1].length : 0)
      }
    }
  }

  insert(...params) {
    if (params.length > this._noOfDimensions) {
      throw new Error('Extra arguments are passed')
    }

    let item = []

    for (let index = 0; index < params.length; index++) {
      const key = params[index]

      if (key) {
        item[index] = key
        if(index < this._dimensions.length) {
          const hashMap = this._indexMaps[index].map

          if (hashMap) {
            hashMap[key] = hashMap[key] || []
            hashMap[key].push(item)
          }
        }
      }
    }

    if (item.length > 0) {
      this._records.push(item)
    }
  }

  find(dimension: string, value: any) {
    let results = this.findAll(dimension, value)
    return results && results.length > 0 ? results[0] : null
  }

  findAll(dimension: string, value: any) {
    const index = this._dimensions.indexOf(dimension)
    if (index === -1) {
      throw new Error('Invalid dimension')
    }

    const hashMap = this._indexMaps[index].map

    if (hashMap && hashMap[value] && hashMap[value].length > 0) {
      return hashMap[value]
    } else {
      return null
    }
  }

  /**
   * Returns all the records in the MultiHashMap.
   *
   * @returns An array of all the records.
   * @memberOf MultiHashMap
   */
  getAll(): Array<any> {
    return this._records
  }

  remove(record: Array<any>) {
    if (record && record.length !== this._dimensions.length) {
      throw new Error('Invalid Record')
    }

    let records = this._records.filter(recordItem => {
      return recordItem.every((element, index) => element === record[index])
    })

    // remove record with their mapping
    records.forEach((recordItem) => {
      this._dimensions.forEach((dimesion, index) => {
        let hashMap = this._indexMaps[index].map,
          value = recordItem[index]

        if (hashMap && hashMap[value] && hashMap[value].length > 0) {
          let itemIndex  = hashMap[value].indexOf(recordItem)
          if(itemIndex > -1) {
            hashMap[value].splice(itemIndex, 1)
          }
        }
      })

      let recordIndex = this._records.indexOf(recordItem)
      if (recordIndex > -1) {
        this._records.splice(recordIndex, 1)
      }
    })
  }
}
