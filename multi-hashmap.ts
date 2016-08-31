export class MultiHashMap {
    private _noOfDimensions: number = 0
    private _dimensions: string[]
    private _records = []
    private _indexMaps: { key: string, map: Object[] }[] = []

    constructor(...dimensions: string[]) {
        for (let index = 0; index < dimensions.length; index++) {
            this._indexMaps.push({
                key: dimensions[index],
                map: Object.create(null)
            })
        }

        this._dimensions = dimensions
        this._noOfDimensions = this._dimensions.length
    }

    insert(...params) {
        if (params.length > this._noOfDimensions) {
            throw new Error('Extra arguments are passed')
        }

        let item = []

        for (let index = 0; index < params.length; index++) {
            const key = params[index]

            if (key) {
                const hashMap = this._indexMaps[index].map

                if (hashMap) {
                    item[index] = key
                    hashMap[key] = item
                }
            }
        }

        if (item.length > 0) {
            this._records.push(item)
        }
    }

    find(dimension: string, value: any) {
        const index = this._dimensions.indexOf(dimension)
        if (index === -1) {
            throw new Error('Incorrect dimension')
        }

        const hashMap = this._indexMaps[index].map

        if (hashMap && hashMap[value]) {
            return hashMap[value]
        }

        return []
    }

    private hasContains(hashMap, key) {

    }
}
