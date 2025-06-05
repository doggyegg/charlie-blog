// 平转树

const sourceData = [
{
    id:1,
    pid:null,
},
{
    id:11,
    pid:1
},
{
    id:2,
    pid:null
},
{
    id:22,
    pid:2,
},
{
    id:222,
    pid:22
}]


const treeData = [{
    id:1,
    pid:null,
    children:[{
        id:11,
        pid:1
    }]
},{
    id:2,
    pid:null,
    children:[{
        id:22,
        pid:2,
        children:[{
            id:222,
            pid:22
        }]
    }]
}]
// 平层结构转树
function flatToTree(sourceData){
   
}

console.log(flatToTree(sourceData)); 

// 树状结构打平
function treeToFlat(treeData){
   
}


console.log(treeToFlat(flatToTree(sourceData)));


