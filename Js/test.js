function flat1(arr) {
    return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat1(cur) : cur), []);
}

function flat2(ary) {
    while (ary.some(Array.isArray)) {
        ary = [].concat(...ary);
    }
    return ary;
}

const data = [1, 2, [3, [4, 11]], [5, [6, 7, [8, 9, 6]]]];

const newAry = flat1(data);
// console.log(newAry);

const newAry2 = flat2(data);
// console.log(newAry2);

const throttle1 = function(fn, delay) {
    let timer = null;
    return function() {
        const ctx = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(ctx, args);
        }, delay);
    };
};

const throttle2 = function(fn, delay) {
    let last;
    let timer;
    return function() {
        const ctx = this;
        const args = arguments;
        const now = +new Date();
        if (last && now < last + delay) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(ctx, args);
            }, delay);
        } else {
            last = now;
            fn.apply(ctx, args);
        }
    };
};
function format1(num) {
    return (`${num}`).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}

const format2 = function(num) {
    return String(num).split('').reverse().reduce((pre, cur, index) => ((index % 3) ? cur : `${cur},`) + pre);
};

const bb = format1(12345678);
const aa = format2(123456);

console.log(bb);
console.log(aa);

// interface ConfigFun = {
//     <T>(value: T):T
// }

// var CongifVal = function<T>(value: T):T{
//         rertun value;
// }

// var getData: ConfigFn = CongifVal

// getData<string>('张三')
// getData<number>(1)

/**
* 精髓：用闭包把参数保存起来，收集参数，当参数的数量足够执行函数了，就开始执行函数。
* 简单实现无限调用，每次执行结果返回函数本身, 返回递归函数的同时，将每次执行结果的值存储在函数中。
* 是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数而且返回结果是新函数的技术。
*/

const curry = function(func) {
    // 获取函数的参数个数
    const len = func.length;
    return function() {
        const _args = [].slice.call(arguments); // 获取所有的参数arguments
        // 如果参数个数小于最初的 func.length 则递归调用，继续收集参数
        if (_args.length < len) {
            return curry.call(this, func, _args);
        }
        // 如果参数的数量匹配函数的参数，即执行函数
        return func.apply(this, _args);
    };
};


function add() {
    const args = [].slice.call(arguments);
    const fn = function() {
        const sub_arg = [].slice.call(arguments);
        // 把全部的参数聚集到参数的入口为一个参数： args.concat(sub_arg)
        return add(...args.concat(sub_arg));
    };
    fn.valueOf = function() {
        return args.reduce((a, b) => a + b);
    };
    return fn;
}


// console.log(add(1, 2)); // 3
// console.log(add(1)(2)); // 3
// console.log(add(1)(2)(3)); // 6
// console.log(add(1, 2, 3)(4)); // 10



const add = function () {
    const args = [].splice.call(arguments);
    const fn = function () {
        const subArg = [].splice.call(arguments);
        return add(...args.concat(subArg))
    };
    fn.valueOf = function () {
        return args.reduce((pre,cur)=>pre + cur)
    }
    return fn;
}
