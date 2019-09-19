import { GoogleMapsUtils } from '../../src/utils/google-maps'

describe('Google Map Requests', () => {
    const mapUtils = new GoogleMapsUtils()
    
    beforeEach(() => {
        jest.setTimeout(10000)
    })

    it('should get a list of predictions', async () => {
        let res = await mapUtils.getPlacesBySearch('São Paulo')
        expect(res.data.status).toBe('OK')
        expect(res.data.predictions.length).toBeGreaterThan(0)
    })

    it('should get latitude and longitude from a place ', async () => {
        let res = await mapUtils.getLatLngByAddress('SETOR H NORTE')
        expect(res.data.status).toBe('OK')
        expect(res.data.results.length).toBeGreaterThan(0)
    })

    it('should get nearby places', async () => {
        let params = {
            latitude: -15.834342,
            longitude: -48.014039
        }
        let res = await mapUtils.getNearbyPlaces(params)
        expect(res.data.status).toBe('OK')
        expect(res.data.results.length).toBeGreaterThan(0)
    })
})