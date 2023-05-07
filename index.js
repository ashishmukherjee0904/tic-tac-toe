    let set=new Set();
    let userSet = new Set();
    let compSet = new Set();
    let resultDeclared = false;
    function replay(){
        resultDeclared= false;
        set=new Set();
        userSet = new Set();
        compSet = new Set();
        document.getElementById("result").innerHTML = "";
        document.getElementById("t").innerHTML = "<tr><td id=\"1\" onclick=\"userClick(1)\"></td><td id=\"2\" onclick=\"userClick(2)\"></td><td id=\"3\" onclick=\"userClick(3)\"></td></tr><tr><td id=\"4\" onclick=\"userClick(4)\"></td><td id=\"5\" onclick=\"userClick(5)\"></td><td id=\"6\" onclick=\"userClick(6)\"></td></tr><tr><td id=\"7\" onclick=\"userClick(7)\"></td><td id=\"8\" onclick=\"userClick(8)\"></td><td id=\"9\" onclick=\"userClick(9)\"></td></tr>"
    }
    
    function userClick(id){
        if(!resultDeclared){
        if(set.has(id)){
            alert('Please select unvisited box');
            return;
        }
        document.getElementById(id).innerHTML = '&#10050;'
        console.log('user clicked',id);
        set.add(id);
        userSet.add(id);
        
        
        if(set.size>3){
            console.log('Judging');
            if(judgeWinner(userSet)){
                won();
                console.log('userSet',userSet);
                console.log('compSet',compSet);
                return;
            }
        }
        
        let r = randomIntFromInterval(1,9);
        while(set.has(r)&&set.size<9){
            console.log('random generated value ', r);
            r = randomIntFromInterval(1,9)
        }
        console.log('random generated value ', r);
        set.add(r);
        if(compSet.size>=4){
            setTimeout(() => {
                document.getElementById("result").innerHTML = "<div><h2>It's a draw!!!</h2><br/><button onclick=\"replay()\" style=\"background-color: #068dc3;border: none;color: white;padding: 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;\">Restart</button></div>";
            }, 200);
            resultDeclared=true;
            console.log('userSet',userSet);
            console.log('compSet',compSet);
            return;
        }
        compSet.add(r);
        setTimeout(() => {
            document.getElementById(r).innerHTML = '&#10008;'        
        }, 300);
        
        if(judgeWinner(compSet)){
            setTimeout(() => {
                document.getElementById("result").innerHTML = "<div><h2>You Lost!!!</h2><br/><button onclick=\"replay()\" style=\"background-color: #068dc3;border: none;color: white;padding: 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;\">Restart</button></div>"

            }, 1000);
            resultDeclared=true;
            console.log('userSet',userSet);
            console.log('compSet',compSet);
            
        }else{
            lost(userSet.size);
        }
    }

    }
    function judgeWinner(userSet) {
        //cases to win:
        // 1 2 3 | 4 5 6 | 7 8 9 - diff 1
        // 1 4 7 | 2 5 8 | 3 6 9- diff 3
        // 3 5 7 diff 2
        // 1 5 9
        if(userSet.has(3)&&userSet.has(5)&&userSet.has(7)){
            return true;
        }
        else if(userSet.has(1)&&userSet.has(5)&&userSet.has(9)){
            return true;
        }
        else if(userSet.has(1)&&userSet.has(2)&&userSet.has(3)){
            return true;
        }
        else if(userSet.has(4)&&userSet.has(5)&&userSet.has(6)){
            return true;
        }
        else if(userSet.has(7)&&userSet.has(8)&&userSet.has(9)){
            return true;
        }
        else if(userSet.has(1)&&userSet.has(4)&&userSet.has(7)){
            return true;
        }
        else if(userSet.has(2)&&userSet.has(5)&&userSet.has(8)){
            return true;
        }
        else if(userSet.has(3)&&userSet.has(6)&&userSet.has(9)){
            return true;
        }
        return false;
    }
    function lost(size){
        if(size<5){
            console.log('Player has attempts left');
            return false;
        }
        setTimeout(() => {
                // document.getElementById("t").innerText = "You Lost!!!"
                document.getElementById("result").innerHTML = "<div><h2>You Lost!!!</h2><br/><button onclick=\"replay()\" style=\"background-color: #068dc3;border: none;color: white;padding: 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;\">Restart</button></div>"
            }, 500);
            resultDeclared=true;
            console.log('userSet',userSet);
            console.log('compSet',compSet);
            
        return true;
    }
    function won(){
        resultDeclared=true;
        document.getElementById("result").innerHTML = "<div><h2>Congratulations!! You Won!!!</h2><br/><button onclick=\"replay()\" style=\"background-color: #068dc3;border: none;color: white;padding: 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;\" >Restart</button></div>"
    }
    function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
