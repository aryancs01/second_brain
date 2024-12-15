export function linkHashUtil(){
    const sample = "qwertyuiopasdfghjklzxcvbnm0192837465";
    let ans = "";

    for(let i=0;i<10;i++){
        ans += sample[Math.floor(Math.random()*sample.length)];
    }

    return ans;
}