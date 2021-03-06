// gridlines in x axis function


// document.querySelector('head').innerHTML += '<link rel="stylesheet" href="kalk.css" type="text/css"/>';

start();

/**
    start aplication kalk
 */
function start() {
    // show logo with reload option
    var html = '';
    html += `<div class="d-flex align-center align-baseline">`;
    html +=     `<a class="px-3" href="#" onclick=location.reload(true); style="">`;
    html +=         `<img src="img/logo.svg" alt="Logo" width="36">`;
    html +=     `</a>`;
    html +=     `<span class="fs-5 text-nowrap mt-2">Company name</span>`;
    html += `</div>`;
    d3.selectAll('.logo').html(html);

    // show global action top right corner
    // settings defined basic parameters: lingerie, trucke, hotels 
    html = `<btn style="font-size:32px;" onclick="settings();">&#x2699;</btn>`;
    html += `<btn style="font-size:32px;" onclick="exit();">&#x261e;</btn>`; // EXIT IF LOGGING // dark &#x261b;
    d3.select('.actions').html(html);
    
    d3.select('.help').style('display', 'none'); // help option if requested

// var http = require('http'); // http module
// var menu = require("./db/menu.json");


    d3.json("db/menu.json").then(function(data) { window.menu = data; });
    // d3.json("dose.json").then(function(data) { window.dose = data; });
    d3.json("db/carts.json").then(function(data) { window.carts = data; });

    // request from http://localhost:5101/trucks
    let url = "http://localhost:5101/trucks";
    fetch(url)
        .then(function(response) {
            console.log('fetch response trucks', response);
            return response.json();
        })
        .then(function(data) {
            console.log('fetch data trucks', data);
            window.trucks = data;
        })
        .catch(function(error) {
            console.log('fetch error trucks', error);
        });
    // d3.json("db/trucks.json").then(function(data) { window.trucks = data; });
    d3.json("db/hotels.json").then(function(data) { window.hotels = data; });
    d3.json("db/reporting.json").then(function(data) { window.reporting = data; });
    d3.json("db/dose.json").then(function(data) { window.dose = data; });


// getNewFileHandle();
// function getNewFileHandle() {
//     var data = new FormData();
//     data.append("upfile", new Blob(["CONTENT"], {type: "text/plain"}));
//     fetch("SERVER.SCRIPT", { method: "POST", body: data });
// }

// const fileHandle = await window.showSaveFilePicker();

// const fileStream = await fileHandle.createWritable();
// await fileStream.write(new Blob(["CONTENT"], {type: "text/plain"}));
// await fileStream.close();

    d3.select('.pradlo').html(nove_pradlo());
    d3.select('.auto').html(upload_trucks());
    d3.select('.report').html(reporting());

}

/**
    settings add and update basic parameters of application: lingerie, trucke, hotels etc.
 */
function settings() {
    console.log('settings');
    let rot = d3.select(`.pradlo`);
    let rot_html = '';
    rot_html += `<div class="row">`;
    rot_html += `<div id="menu" class="col-sm-2"></div>`;
    rot_html += `<div id="input" class="col-sm-10"></div>`;
    rot_html += `</div>`;
    rot.html(rot_html);

    let menu = d3.select(`#menu`);
    function showMenu() {
        let html = '';
        if( typeof window.selected_option === 'undefined' ) {
            window.selected_option = {rot: 'menu', opt: '0'};
        }
        html += `<ul class="col m-4" style="cursor: pointer; text-decoration: none; list-style-type: none;">`;
        for (let i = 0; i < window.menu.length; i++) {
            let option = window.menu[i].option;
            let text = window.menu[i].text;
            html += `<li id="menu_${i}" class="menu p-1" onclick="select_option('menu', '${i}');" title="Start option: ${i} ${option}" style='background-color: transparent; color: var(--text-color);'>${text}</li>`; 
        }
        html += `</ul>`;
        return html;
    }
    let menu_html = showMenu();
    menu.html(menu_html);


}

function select_option(rot, opt) {
    window.selected_option = {rot, opt};
    console.log('select_option', window.selected_option);
    d3.selectAll(`.${rot}`).attr("style", 'background-color: transparent; color: var(--text-color);');
    d3.select(`#${rot}_${opt}`).attr("style", 'background-color: var(--bg-selected); color: var(--color-selected);');

    let input = d3.select(`#input`);
    let html = seting_input();
    input.html(html);
    function seting_input() {
        let h = '';
        if( window.selected_option.opt == "0") {
            h += '<div class="fs-5">Input block: </div>';
        } else {
            let option = window.menu[window.selected_option.opt].option;
            console.log('option', option);
            h += `<div class="fs-5 m-2">Input block: ${option}`;
            h += '<table class="table">';
            for( i=0; i < window[option].length; i++) {
                if (i === 0) {
                    h += '<tr>';
                    for( let [key, value] of Object.entries(window[option][i])) {
                        h += '<th>' + key + '</th>';
                    }
                    h += '</tr>';
                } 
                h += '<tr>';
                for( let [key, value] of Object.entries(window[option][i])) {
                        if (typeof value === 'object') { 
                            h += '<td class="p-2">';
                            for (let kk of Object.keys(value)) {
                                var vv = value[kk];
                                h += `${kk}: ${vv}, `;
                            }
                            h += '</td>';
                        } else {
                            h += '<td class="p-2">' + value + '</td>';
                        }
                }
                h += '</tr>';
            }
            h += '</table>';
            h += '</div>';
        }
        return h;
    }    // return `select_option('${rot}', '${opt}')`;
}

function menu_li(selected = false) {
    let out = "";
    let width = 120,
        jump = 10;
    if (selected) {
        out += "background: #ccc;";
        out += "color: #000f;";
        out += "padding-left:" + 2 * jump + "px;";
        out += "width:" + (width - jump) + "px;";
    } else {
        out += "background: #ddd;";
        out += "color: #aaa;";
        out += "padding-left: " + jump + "px;";
        out += "width: " + width + "px;";
    }
    out += "margin-left: 10px;";
    out += "border: 1px solid #ccc;"
    return out;
}


function menu_auto() {
    menu_blok = document.getElementById(`menu_2`);
    let rot = 'auto';
    d3.json("auto.json").then(function(data) {
        let menu_blok = d3.select(`#menu_2`);
        menu_blok.append("ul")
            .attr("id", rot)
            .attr("style", function(d) {
                let out = "";
                out += "width: 100px;";
                out += "list-style-type: none;";
                return out;
            })
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .attr("id", function(d) { return `${rot}_${d.id}` })
            .attr("onclick", function(d) {
                return select_option(rot, d.id);
            })
            .attr("style", function(d) {
                return menu_li(false);
            })
            .text(function(d) { return d.vyrobce; });

    var arr = ["string1","string2","string3","string4","string5"];
    let input = d3.select("#input");
    input.selectAll('span')
        .data(data)
        .enter()
        .append('span')
        .html(function(d){
            let html = `<table>`;
            i = 0;
            for( k in d) {
                // if (i === 0) {
                    html += `<tr><td>${k}</td><td>${d[k]}</td></tr>`;
                    // console.log(i);
                // } 
                i++;
            }
            html += `</table>`;
            return html;
        })
        .append('br');
    });


}

function nove_pradlo() {
    let h = '';
    h += '<div class="fs-5 m-4">Insert NEW cart to export:</div>';
    h += '<table class="table">';
    h += '<tr>';
    // h += '<th>id</th>';
    h += '</tr>';
    h += '</table>';
    h += '</div>';

    return h;
}

function upload_trucks() {
    let h = '';
    h += '<div class="fs-5 m-4">Upload cart to trucks: </div>';
    h += '<table class="table">';
    h += '<tr>';
    // h += '<th>id</th>';
    h += '</tr>';
    h += '</table>';
    h += '</div>';

    return h;
}

function reporting() {
    let h = '';
    h += '<div class="fs-5 m-4">Reporting: truck, carts, hotels</div>';
    h += '<table class="table">';
    h += '<tr>';
    // h += '<th>id</th>';
    h += '</tr>';
    h += '</table>';
    h += '</div>';

    return h;
}

if(typeof window.dose === 'undefined') {
    d3.select('.footer').html(`<div class="fs-5">INSERT CART</div>`);
} else {
    d3.select('.footer').html(`<div class="fs-5">${window.dose}</div>`);
}



/**
 * description:
 * - universal fetch to call PHP API with: select, insert, update and delete SQL action
 * @param {*} url
 * @param {*} json
 */
async function fetch4php(url, json) {
    console.log("fetch4php: " + url, json);
    // debugger;    
    await fetch(url, {
        url,
        method: "GET",
        Headers: {
            "Content-Type": "application/json",
            redirect: false,
        },
        body: JSON.stringify(json),
    }).then((response) => {
        if (response.ok) {
            response.json().then(
                function(result) {
                    window[result.response] = result.data;
                    // console.log(`window.${result.response} = ${result.data.length} rows`);
                    // result_fetch2php = result.data;
                    return response;
                },
                function(err) {
                    // console.log("Failed result.data", err);
                    return null;
                }
            );
            // window.response = response.json();
        } else {
            console.log("fetch4php: response failed; url:" + url + " response: " + response);
            return false;
        }
    });
}
