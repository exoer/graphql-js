const DataLoader = require('dataloader');

async function batchUsers (Users, keys) {
  const unorderedUsers = await Users.find({_id: {$in: keys}}).toArray()
  let obj = {}
  unorderedUsers.forEach(x => obj[x._id]=x)
  const ordered = keys.map(key => obj[key])
  return ordered
}

module.exports = ({Users}) =>({
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys),
    {cacheKeyFn: key => key.toString()},
  ),
});
