#!/usr/bin/env node

import axios from 'axios'
import 'dotenv/config'

/** @const {string} */
const BASE_URL = 'https://api.myintervals.com'

/** @const {string} */
const API_KEY = process.env.API_KEY

if (!API_KEY) {
  console.error('API_KEY must be defined in .env file. See https://help.myintervals.com/api/get-api-token/')
}

/**
 * Gets a list of active clients that contain projects
 * @see {@link https://www.myintervals.com/api/resource.php?r=client}
 * @returns {Array} Array of client objects, each containing properties: id, name, active, localidunpadded, localid
 */
export async function getClients () {
  const url = '/client/?active=true&projectsonly=true'
  const response = await makeRequest(url)

  return response.client
}

/**
 * Gets time entered in TimeTask
 * @see {@link https://www.myintervals.com/api/resource.php?r=time}
 * @returns {Array} Array of time objects, including (but not limited to) properties: date, dateiso, time (hours), billable (boolean), description
 */
export async function getTime () {
  const url = '/time/'
  const response = await makeRequest(url)

  return response.time
}

/**
 * Makes an API request to the Intervals API
 * @private
 * @param {string} url API URL to append to baseUrl
 * @param {string} method Request method, e.g. get, post, put
 * @returns Response data
 */
async function makeRequest (url, method = 'get') {
  const response = await axios({
    method,
    url: BASE_URL + url,
    auth: {
      username: API_KEY
    }
  })

  return response.data
}
