export const collectionExists = async (db: any, collectionName: string) => {
  const allCollections = await db.listCollections().toArray();
  //console.log('collectionNames=', allCollections);
  return (allCollections.filter( (c: any) => c.name === collectionName).length > 0);
}