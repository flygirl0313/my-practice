// 输入: "tree"   输出:  "eert"
// 输入: "Aabb"   输出:  "bbAa"

// 'e'出现两次，'r'和't'都只出现一次。
// 因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。


// 自己做，性能太差
var frequencySort = function (str) {
    let strObj = {}
    let resStr = '' 
    //问题1.此处用 map 结构更好，直接记录 key 和 value
    for (let i = 0; i < str.length; i++){
        if (Object.keys(strObj).indexOf(str[i])>-1) {
            strObj[str[i]] = strObj[str[i]] + 1
        } else {
            strObj[str[i]] = 1
        }
    } 
    //问题2. 直接排序字符串，不用特意记录统计次数值的数组，增加了一层遍历（最大问题）
    //问题3. let countValues = Object.values(strObj).sort().reverse();  //  // sort本身带排序规则用什么reverse, 
    let countValues = Object.values(strObj).sort((a, b) => strObj[a] - strObj[b]);  
    let sortArr = Array.from(new Set([...countValues]));
    sortArr.forEach((countNum) => {
        Object.keys(strObj).forEach((item) => {
            if (strObj[item] == countNum) {
                // 问题4. res = res.concat(new Array(countNum).fill(item)) // 字符串有repeat函数，直接可用，无需转数组再转字符串
                resStr += item.repeat(countNum) 
            }
        })
    })
    return resStr
};

var frequencySort2 = function (str) {
    let map = new Map();
    let res = '';
    for (let i = 0; i < str.length; i++) {
        map[str[i]] ? map[str[i]]++ : map[str[i]] = 1;
    }
    let sortKeys = Object.keys(map).sort((a, b) => map[b] - map[a])
    for (let i = 0; i < sortKeys.length; i++) {
        res += sortKeys[i].repeat(map[sortKeys[i]]);
    }
    return res;
}

const str = 'bbcaaaadc'
const res = frequencySort2(str)
console.log(res)


