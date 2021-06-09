const serviceName = {
  water: {
    v2: 'Apply for a large countryside productivity grant for water',
    v3: 'Apply for a large grant for a water resource management project',
    v4: 'Apply for a large grant for a water resource management project',
    v4b: 'Apply for a large grant for a water resource management project',
    v5: 'Apply for a Farming Transformation Fund water resource management grant',
    v6: 'Check if you can apply for a water resource management grant',
    v7private: 'Check if you can apply for a water resource management grant',
    current: 'Check if you can apply for a Farming Transformation Fund water management grant'
  },
  slurry: {
    v3: 'Apply for a large grant for slurry equipment',
    v4: 'Apply for a large grant for slurry equipment',
    v4b: 'Apply for a large grant for slurry equipment',
    v5: 'Apply for a large grant for slurry equipment',
    v6: 'Apply for a large grant for slurry equipment',
    v7private: 'Apply for a large grant for slurry equipment',
    current: 'Apply for a large grant for slurry equipment'
  }
}

const schemeList = Object.keys(serviceName)

module.exports = { serviceName, schemeList }
