import React from 'react';
import ApexChart from 'react-apexcharts';
import { Badge, Col, Row, Table } from 'reactstrap';
import InfoTile from '../../components/InfoTile/InfoTile';
import Widget from '../../components/Widget';
import WinnerSlider from './components/WinnerSlider/WinnerSlider'
import Calendar from './components/calendar/Calendar';
import s from './Dashboard.module.scss';
import Particles from 'react-particles-js';
// import BlockchainManager from '../../utils/BlockchainManager';
import Web3Provider from "../../components/Blockchain/Web3Provider"
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Level from "./components/Level/Level";

class Dashboard extends React.Component {


  async componentDidMount() {
    // const data = await instance.data;
    // BlockchainManager.getInstance().getUsersIncomes(1, (isError, data) => {
    //   console.log("===============");
    //   console.log(data,isError);

    //   if (isError) {

    //     console.log("error");
    //     //handle errors
    //     //TODO implement error notification system
    //   } else {
    //     this.setState({
    //       directIncome: data.directIncome,
    //       recycleIncome: data.recycleIncome,
    //       levelIncome: data.levelIncome,
    //       recycleFund: data.recycleFund,
    //       levelFund: data.levelFund,
    //       rewardIncome : data.rewardIncome
    //     })
    //   }
    // });

  }

  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
      cd: this.getChartData(),
      directIncome: 0,
      recycleIncome: 0,
      levelIncome: 0,
      recycleFund: 0,
      levelFund: 0,
      rewardIncome: 0
    };
    this.checkTable = this.checkTable.bind(this);
  }
  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }



  getChartData() {

    const colors = {
      blue: '#1870DC',
      green: '#58D777',
      orange: '#f0af03',
      red: '#F45722',
      purple: '#474D84',
      dark: '#040620',
      teal: '#14d3d3',
      pink: '#e671b8',
      gray: '#d6dee5',
      default: '#595d78',
      textColor: '#e0e0e1',
      gridLineColor: '#040620'
    };

    let columnColors = [colors.blue, colors.green, colors.orange, colors.red, colors.default, colors.gray, colors.teal, colors.pink];
    let lineColors = [colors.blue, colors.green, colors.orange];

    var chartData = {
      apex: {
        column: {
          series: [{
            data: [21, 22, 10, 28, 16, 21, 13, 30]
          }],
          options: {
            chart: {
              height: 350,
              type: 'bar'
            },
            colors: columnColors,
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true
              }
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8', 'Level 9', 'Level 10'],
              labels: {
                style: {
                  colors: columnColors,
                  fontSize: '14px'
                }
              },
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              }
            },
            yaxis: {
              labels: {
                categories: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8', 'Level 9', 'Level 10'],

                style: {
                  color: colors.textColor,
                }
              }
            },
            tooltip: {
              theme: 'dark'
            },
            grid: {
              borderColor: colors.gridLineColor
            }
          }
        },
        pie: {
          series: [25, 15, 44, 55, 41, 17],
          options: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            theme: {
              monochrome: {
                enabled: true,
                color: colors.blue,
              }
            },
            stroke: {
              show: false,
              width: 0
            },
            legend: false,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
        }
      },
      echarts: {
        line: {
          color: lineColors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['2015 Precipitation', '2016 Precipitation'],
            textStyle: {
              color: colors.textColor
            }
          },
          grid: {
            top: 70,
            bottom: 50,
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: lineColors[1]
                }
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return 'Precipitation  ' + params.value
                      + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: ["2020-1", "2020-2", "2020-3", "2020-4", "2020-5", "2020-6", "2020-7", "2020-8", "2020-9", "2020-10", "2020-11", "2020-12"]
            },
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: lineColors[0]
                }
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return 'Precipitation  ' + params.value
                      + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12"]
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: colors.textColor
              },
              axisLine: {
                lineStyle: {
                  color: colors.textColor
                }
              },
              splitLine: {
                lineStyle: {
                  color: colors.gridLineColor
                }
              },
              axisPointer: {
                label: {
                  color: colors.dark
                }
              }
            }
          ],
          series: [
            {
              name: '2015 Precipitation',
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '2016 Precipitation',
              type: 'line',
              smooth: true,
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            }
          ]
        },
        donut: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            show: false
          },
          color: [colors.blue, colors.green, colors.orange, colors.red, colors.purple],
          series: [
            {
              name: 'Access source',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: 'Direct interview' },
                { value: 310, name: 'Email marketing' },
                { value: 234, name: 'Alliance advertising' },
                { value: 135, name: 'Video ad' },
                { value: 1548, name: 'Search engine' }
              ]
            }
          ]
        },
        river: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid'
              }
            }
          },

          legend: {
            data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD'],
            textStyle: {
              color: colors.textColor
            }
          },
          color: [colors.blue, colors.green, colors.orange, colors.red, colors.purple, colors.gray],
          singleAxis: {
            top: 50,
            bottom: 50,
            axisTick: {},
            axisLabel: {
              color: colors.textColor
            },
            type: 'time',
            axisPointer: {
              animation: true,
              label: {
                show: true,
                color: colors.dark
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: [colors.gridLineColor],
                type: 'dashed',
                opacity: 0.2
              }
            },
            axisLine: {
              lineStyle: {
                color: colors.textColor
              }
            },
          },

          series: [
            {
              type: 'themeRiver',
              itemStyle: {
                emphasis: {
                  shadowBlur: 20,
                  shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
              },
              data: [['2015/11/08', 10, 'DQ'], ['2015/11/09', 15, 'DQ'], ['2015/11/10', 35, 'DQ'],
              ['2015/11/11', 38, 'DQ'], ['2015/11/12', 22, 'DQ'], ['2015/11/13', 16, 'DQ'],
              ['2015/11/14', 7, 'DQ'], ['2015/11/15', 2, 'DQ'], ['2015/11/16', 17, 'DQ'],
              ['2015/11/17', 33, 'DQ'], ['2015/11/18', 40, 'DQ'], ['2015/11/19', 32, 'DQ'],
              ['2015/11/20', 26, 'DQ'], ['2015/11/21', 35, 'DQ'], ['2015/11/22', 40, 'DQ'],
              ['2015/11/23', 32, 'DQ'], ['2015/11/24', 26, 'DQ'], ['2015/11/25', 22, 'DQ'],
              ['2015/11/26', 16, 'DQ'], ['2015/11/27', 22, 'DQ'], ['2015/11/28', 10, 'DQ'],
              ['2015/11/08', 35, 'TY'], ['2015/11/09', 36, 'TY'], ['2015/11/10', 37, 'TY'],
              ['2015/11/11', 22, 'TY'], ['2015/11/12', 24, 'TY'], ['2015/11/13', 26, 'TY'],
              ['2015/11/14', 34, 'TY'], ['2015/11/15', 21, 'TY'], ['2015/11/16', 18, 'TY'],
              ['2015/11/17', 45, 'TY'], ['2015/11/18', 32, 'TY'], ['2015/11/19', 35, 'TY'],
              ['2015/11/20', 30, 'TY'], ['2015/11/21', 28, 'TY'], ['2015/11/22', 27, 'TY'],
              ['2015/11/23', 26, 'TY'], ['2015/11/24', 15, 'TY'], ['2015/11/25', 30, 'TY'],
              ['2015/11/26', 35, 'TY'], ['2015/11/27', 42, 'TY'], ['2015/11/28', 42, 'TY'],
              ['2015/11/08', 21, 'SS'], ['2015/11/09', 25, 'SS'], ['2015/11/10', 27, 'SS'],
              ['2015/11/11', 23, 'SS'], ['2015/11/12', 24, 'SS'], ['2015/11/13', 21, 'SS'],
              ['2015/11/14', 35, 'SS'], ['2015/11/15', 39, 'SS'], ['2015/11/16', 40, 'SS'],
              ['2015/11/17', 36, 'SS'], ['2015/11/18', 33, 'SS'], ['2015/11/19', 43, 'SS'],
              ['2015/11/20', 40, 'SS'], ['2015/11/21', 34, 'SS'], ['2015/11/22', 28, 'SS'],
              ['2015/11/23', 26, 'SS'], ['2015/11/24', 37, 'SS'], ['2015/11/25', 41, 'SS'],
              ['2015/11/26', 46, 'SS'], ['2015/11/27', 47, 'SS'], ['2015/11/28', 41, 'SS'],
              ['2015/11/08', 10, 'QG'], ['2015/11/09', 15, 'QG'], ['2015/11/10', 35, 'QG'],
              ['2015/11/11', 38, 'QG'], ['2015/11/12', 22, 'QG'], ['2015/11/13', 16, 'QG'],
              ['2015/11/14', 7, 'QG'], ['2015/11/15', 2, 'QG'], ['2015/11/16', 17, 'QG'],
              ['2015/11/17', 33, 'QG'], ['2015/11/18', 40, 'QG'], ['2015/11/19', 32, 'QG'],
              ['2015/11/20', 26, 'QG'], ['2015/11/21', 35, 'QG'], ['2015/11/22', 40, 'QG'],
              ['2015/11/23', 32, 'QG'], ['2015/11/24', 26, 'QG'], ['2015/11/25', 22, 'QG'],
              ['2015/11/26', 16, 'QG'], ['2015/11/27', 22, 'QG'], ['2015/11/28', 10, 'QG'],
              ['2015/11/08', 10, 'SY'], ['2015/11/09', 15, 'SY'], ['2015/11/10', 35, 'SY'],
              ['2015/11/11', 38, 'SY'], ['2015/11/12', 22, 'SY'], ['2015/11/13', 16, 'SY'],
              ['2015/11/14', 7, 'SY'], ['2015/11/15', 2, 'SY'], ['2015/11/16', 17, 'SY'],
              ['2015/11/17', 33, 'SY'], ['2015/11/18', 40, 'SY'], ['2015/11/19', 32, 'SY'],
              ['2015/11/20', 26, 'SY'], ['2015/11/21', 35, 'SY'], ['2015/11/22', 4, 'SY'],
              ['2015/11/23', 32, 'SY'], ['2015/11/24', 26, 'SY'], ['2015/11/25', 22, 'SY'],
              ['2015/11/26', 16, 'SY'], ['2015/11/27', 22, 'SY'], ['2015/11/28', 10, 'SY'],
              ['2015/11/08', 10, 'DD'], ['2015/11/09', 15, 'DD'], ['2015/11/10', 35, 'DD'],
              ['2015/11/11', 38, 'DD'], ['2015/11/12', 22, 'DD'], ['2015/11/13', 16, 'DD'],
              ['2015/11/14', 7, 'DD'], ['2015/11/15', 2, 'DD'], ['2015/11/16', 17, 'DD'],
              ['2015/11/17', 33, 'DD'], ['2015/11/18', 4, 'DD'], ['2015/11/19', 32, 'DD'],
              ['2015/11/20', 26, 'DD'], ['2015/11/21', 35, 'DD'], ['2015/11/22', 40, 'DD'],
              ['2015/11/23', 32, 'DD'], ['2015/11/24', 26, 'DD'], ['2015/11/25', 22, 'DD'],
              ['2015/11/26', 16, 'DD'], ['2015/11/27', 22, 'DD'], ['2015/11/28', 10, 'DD']]
            }
          ]
        }
      },
      highcharts: {
        mixed: {
          chart: {
            type: 'spline',
            height: 350,
            backgroundColor: 'transparent'
          },
          exporting: {
            enabled: false
          },
          title: {
            text: 'Snow depth at Vikjafjellet, Norway',
            style: {
              color: colors.textColor
            }
          },
          credits: {
            enabled: false
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
            },
            labels: {
              style: {
                color: colors.textColor
              }
            }
          },
          yAxis: {
            min: 0,
            title: {
              enabled: false
            },
            labels: {
              style: {
                color: colors.textColor
              }
            },
            gridLineColor: colors.gridLineColor
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              marker: {
                enabled: false,
                symbol: 'circle'
              }
            }
          },
          colors: [colors.green, colors.blue, colors.red],

          series: [{
            name: "Winter 2014-2015",
            data: [
              [Date.UTC(1970, 10, 25), 0],
              [Date.UTC(1970, 11, 6), 0.25],
              [Date.UTC(1970, 11, 20), 1.41],
              [Date.UTC(1970, 11, 25), 1.64],
              [Date.UTC(1971, 0, 4), 1.6],
              [Date.UTC(1971, 0, 17), 2.55],
              [Date.UTC(1971, 0, 24), 2.62],
              [Date.UTC(1971, 1, 4), 2.5],
              [Date.UTC(1971, 1, 14), 2.42],
              [Date.UTC(1971, 2, 6), 2.74],
              [Date.UTC(1971, 2, 14), 2.62],
              [Date.UTC(1971, 2, 24), 2.6],
              [Date.UTC(1971, 3, 1), 2.81],
              [Date.UTC(1971, 3, 11), 2.63],
              [Date.UTC(1971, 3, 27), 2.77],
              [Date.UTC(1971, 4, 4), 2.68],
              [Date.UTC(1971, 4, 9), 2.56],
              [Date.UTC(1971, 4, 14), 2.39],
              [Date.UTC(1971, 4, 19), 2.3],
              [Date.UTC(1971, 5, 4), 2],
              [Date.UTC(1971, 5, 9), 1.85],
              [Date.UTC(1971, 5, 14), 1.49],
              [Date.UTC(1971, 5, 19), 1.27],
              [Date.UTC(1971, 5, 24), 0.99],
              [Date.UTC(1971, 5, 29), 0.67],
              [Date.UTC(1971, 6, 3), 0.18],
              [Date.UTC(1971, 6, 4), 0]
            ]
          }, {
            name: "Winter 2015-2016",
            type: 'areaspline',
            data: [
              [Date.UTC(1970, 10, 9), 0],
              [Date.UTC(1970, 10, 15), 0.23],
              [Date.UTC(1970, 10, 20), 0.25],
              [Date.UTC(1970, 10, 25), 0.23],
              [Date.UTC(1970, 10, 30), 0.39],
              [Date.UTC(1970, 11, 5), 0.41],
              [Date.UTC(1970, 11, 10), 0.59],
              [Date.UTC(1970, 11, 15), 0.73],
              [Date.UTC(1970, 11, 20), 0.41],
              [Date.UTC(1970, 11, 25), 1.07],
              [Date.UTC(1970, 11, 30), 0.88],
              [Date.UTC(1971, 0, 5), 0.85],
              [Date.UTC(1971, 0, 11), 0.89],
              [Date.UTC(1971, 0, 17), 1.04],
              [Date.UTC(1971, 0, 20), 1.02],
              [Date.UTC(1971, 0, 25), 1.03],
              [Date.UTC(1971, 0, 30), 1.39],
              [Date.UTC(1971, 1, 5), 1.77],
              [Date.UTC(1971, 1, 26), 2.12],
              [Date.UTC(1971, 3, 19), 2.1],
              [Date.UTC(1971, 4, 9), 1.7],
              [Date.UTC(1971, 4, 29), 0.85],
              [Date.UTC(1971, 5, 7), 0]
            ]
          }, {
            name: "Winter 2016-2017",
            type: 'areaspline',
            data: [
              [Date.UTC(1970, 9, 15), 0],
              [Date.UTC(1970, 9, 31), 0.09],
              [Date.UTC(1970, 10, 7), 0.17],
              [Date.UTC(1970, 10, 10), 0.1],
              [Date.UTC(1970, 11, 10), 0.1],
              [Date.UTC(1970, 11, 13), 0.1],
              [Date.UTC(1970, 11, 16), 0.11],
              [Date.UTC(1970, 11, 19), 0.11],
              [Date.UTC(1970, 11, 22), 0.08],
              [Date.UTC(1970, 11, 25), 0.23],
              [Date.UTC(1970, 11, 28), 0.37],
              [Date.UTC(1971, 0, 16), 0.68],
              [Date.UTC(1971, 0, 19), 0.55],
              [Date.UTC(1971, 0, 22), 0.4],
              [Date.UTC(1971, 0, 25), 0.4],
              [Date.UTC(1971, 0, 28), 0.37],
              [Date.UTC(1971, 0, 31), 0.43],
              [Date.UTC(1971, 1, 4), 0.42],
              [Date.UTC(1971, 1, 7), 0.39],
              [Date.UTC(1971, 1, 10), 0.39],
              [Date.UTC(1971, 1, 13), 0.39],
              [Date.UTC(1971, 1, 16), 0.39],
              [Date.UTC(1971, 1, 19), 0.35],
              [Date.UTC(1971, 1, 22), 0.45],
              [Date.UTC(1971, 1, 25), 0.62],
              [Date.UTC(1971, 1, 28), 0.68],
              [Date.UTC(1971, 2, 4), 0.68],
              [Date.UTC(1971, 2, 7), 0.65],
              [Date.UTC(1971, 2, 10), 0.65],
              [Date.UTC(1971, 2, 13), 0.75],
              [Date.UTC(1971, 2, 16), 0.86],
              [Date.UTC(1971, 2, 19), 1.14],
              [Date.UTC(1971, 2, 22), 1.2],
              [Date.UTC(1971, 2, 25), 1.27],
              [Date.UTC(1971, 2, 27), 1.12],
              [Date.UTC(1971, 2, 30), 0.98],
              [Date.UTC(1971, 3, 3), 0.85],
              [Date.UTC(1971, 3, 6), 1.04],
              [Date.UTC(1971, 3, 9), 0.92],
              [Date.UTC(1971, 3, 12), 0.96],
              [Date.UTC(1971, 3, 15), 0.94],
              [Date.UTC(1971, 3, 18), 0.99],
              [Date.UTC(1971, 3, 21), 0.96],
              [Date.UTC(1971, 3, 24), 1.15],
              [Date.UTC(1971, 3, 27), 1.18],
              [Date.UTC(1971, 3, 30), 1.12],
              [Date.UTC(1971, 4, 3), 1.06],
              [Date.UTC(1971, 4, 6), 0.96],
              [Date.UTC(1971, 4, 9), 0.87],
              [Date.UTC(1971, 4, 12), 0.88],
              [Date.UTC(1971, 4, 15), 0.79],
              [Date.UTC(1971, 4, 18), 0.54],
              [Date.UTC(1971, 4, 21), 0.34],
              [Date.UTC(1971, 4, 25), 0]
            ]
          }]
        },
      }
    }



    // this.setState({ cd: chartData })
    return chartData
  }


  onLevelClicked(levelNumber){
      // console.log("LevelNumber",levelNumber);

      

  }

  render() {
    return (
      <>

        <Web3Provider />
        {/* <Particles style={{
          position: "absolute",
          "top": 0, "left": 0, "z-index": 1
        }}
        
        
        
        particlesRef={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}/> */}

        <div className={s.root}>
          <small>
            <h2>Insights</h2>
          </small>













          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>


            <Col lg={7} xs={12}>


              <Row>



                <Col lg={{ size: 4, offset: 0 }} xs={6} style={{ paddingTop: 5 }}>
                  <InfoTile
                    primaryTitle={"Direct Income"}
                    secondaryTitle={"Total Direct"}
                    primaryAmount={this.props.user.income ? this.props.user.income.directIncome : "0x"}
                    bgStartColor={"#00b894"}
                    bgEndColor={"#018067"}

                    secondaryAmount={this.props.user.income ? this.props.user.totalReferrals : "0x"}

                  />
                </Col>
                <Col lg={{ size: 4, offset: 0 }} xs={6} style={{ paddingTop: 5 }}>
                  <InfoTile

                    primaryTitle={"Reward Income"}
                    secondaryTitle={"Total Win"}
                    primaryAmount={this.props.user.income ? this.props.user.income.rewardIncome : "0x"}
                    bgStartColor={"#0984e3"}
                    bgEndColor={"#06508a"}
                    secondaryAmount={this.props.user ? this.props.user.totalWins : "0x"}


                  />




                </Col>



                <Col lg={{ size: 4, offset: 0 }} xs={6} style={{ paddingTop: 5 }}>
                  <InfoTile

                    primaryTitle={"Level Income"}
                    // secondaryTitle={"Total Team"}
                    primaryAmount={this.props.user.income ? this.props.user.income.levelIncome : "0x"}
                    // secondaryAmount={1000}
                    bgStartColor={"#fdcb6e"}
                    bgEndColor={"#bf8415"}


                  />


                </Col>
                <Col lg={{ size: 4, offset: 0 }} xs={6} style={{ paddingTop: 5 }}>

                  <InfoTile

                    primaryTitle={"Recycle Income"}
                    secondaryTitle={"Total Recycle"}
                    primaryAmount={this.props.user.income ? this.props.user.income.recycleIncome : "0x"}
                    secondaryAmount={this.props.user ? this.props.user.totalRecycles : "0x"}
                    bgStartColor={"#621e94"}
                    bgEndColor={"#240b36"}


                  />





                </Col>


                <Col lg={{ size: 4, offset: 0 }} xs={6} style={{ paddingTop: 5 }}>
                  <InfoTile

                    primaryTitle={"Level Fund"}
                    secondaryTitle={"Level Bought"}
                    primaryAmount={this.props.user.funds ? this.props.user.funds.levelFund : "0x"}
                    secondaryAmount={this.props.user ? this.props.user.levelsPurchased : "0x"}

                    bgStartColor={"#961516"}
                    bgEndColor={"#d63031"}

                  />


                </Col>

                <Col lg={{ size: 4, offset: 0 }} xs={6} style={{ paddingTop: 5 }}>
                  <InfoTile

                    primaryTitle={"Recycle Fund"}
                    secondaryTitle={"Total Recycle"}
                    
                    primaryAmount={this.props.user.funds ? this.props.user.funds.recycleFund : "0x"}
                    secondaryAmount={this.props.user ? this.props.user.totalRecycles : "0x"}
                    bgStartColor={"#d35400"}
                    bgEndColor={"#a1511b"}

                  />


                </Col>



              </Row>





            </Col>


            <Col lg={5} xs={12} style={{ paddingTop: 5 }}>

              <Widget

                title={<h3>Today's <span className="fw-semi-bold">Winners</span></h3>
                }
              >
                <Col>

                  <WinnerSlider />



                </Col>

              </Widget>


            </Col>


          </Row>




          <Widget
            className={'col-10'}
            title={<h3>Buy <span className='fw-semi-bold'>Levels</span></h3>}
          >


            <Row>

              <Level
                bgStartColor={"#621e94"}
                bgEndColor={"#240b36"}
                icon={require("../../images/levels/level2.png")}
                label={"point"}
                levelPosition={"1st"}
                isBought={false}
                amount={700}
                levelNumber={1}
                onLevelClicked={this.onLevelClicked}
              />

              <Level
                bgStartColor={"#0984e3"}
                bgEndColor={"#06508a"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"2nd"}
                levelNumber={2}
                onLevelClicked={this.onLevelClicked}
                label={"point"}
                isBought={false}
                amount={700}
              />

              <Level
                bgStartColor={"#fdcb6e"}
                bgEndColor={"#bf8415"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"3rd"}
                levelNumber={3}
                onLevelClicked={this.onLevelClicked}
                label={"point"}
                isBought={false}
                amount={700}
              />


              <Level
                bgStartColor={"#787777"}
                bgEndColor={"#a8a8a8"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"4th"}

                label={"point"}
                isBought={false}
                amount={700}
              />

              <Level
                bgStartColor={"#961516"}
                bgEndColor={"#d63031"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"5th"}

                label={"point"}
                isBought={false}
                amount={700}
              />
            </Row>


            <Row>

              <Level
                bgStartColor={"#621e94"}
                bgEndColor={"#240b36"}
                icon={require("../../images/levels/level2.png")}
                label={"point"}
                levelPosition={"6th"}
                isBought={false}
                amount={700}
              />

              <Level
                bgStartColor={"#0984e3"}
                bgEndColor={"#06508a"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"7th"}

                label={"point"}
                isBought={false}
                amount={700}
              />

              <Level
                bgStartColor={"#fdcb6e"}
                bgEndColor={"#bf8415"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"8th"}

                label={"point"}
                isBought={false}
                amount={700}
              />


              <Level
                bgStartColor={"#787777"}
                bgEndColor={"#a8a8a8"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"9th"}

                label={"point"}
                isBought={false}
                amount={700}
              />

              <Level
                bgStartColor={"#961516"}
                bgEndColor={"#d63031"}
                icon={require("../../images/levels/level1.png")}
                levelPosition={"10th"}

                label={"point"}
                isBought={false}
                amount={700}
              />
            </Row>


          </Widget>



          <Row>
            <Col >
              <Widget
                title={""}
              >
                <h3>Level Wise <span className="fw-semi-bold">Income</span></h3>
                <p>Description</p>
                {/* <p>Each row is highlighted. You will never lost there. Just <code>.table-striped</code> it.</p> */}
                <Table className="table-striped">
                  <thead>
                    <tr>
                      <th>
                        <div className="abc-checkbox">

                          {/* <Label for="checkbox1" /> */}
                        </div>
                      </th>
                      <th>Level</th>
                      <th>Total Member</th>
                      <th>Total Business</th>
                      <th>Active Members</th>
                      <th>Level Bonus</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="abc-checkbox">

                          {/* <Label for="checkbox2" /> */}
                        </div>
                      </td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td><Badge color="danger">Online</Badge></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">

                          {/* <Label for="checkbox3" /> */}
                        </div>
                      </td>
                      <td>Jacob <Badge color="warning" className="text-gray-dark">ALERT!</Badge></td>
                      <td>Thornton</td>
                      <td><span className="badge bg-gray">Away</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">

                          {/* <Label for="checkbox4" /> */}
                        </div>
                      </td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td><Badge color="danger">Construct</Badge></td>
                    </tr>
                  </tbody>
                </Table>
                <br /><br />
              </Widget>

            </Col>



            <Col>
              <Widget
                title={<h5>Test <span className='fw-semi-bold'>Data Chart</span></h5>}
              >
                <ApexChart
                  className="sparkline-chart"
                  height={350}
                  series={this.state.cd.apex.column.series}
                  options={this.state.cd.apex.column.options}
                  type={"bar"}
                />
              </Widget>



            </Col>


          </Row>











        </div>


      </>


    );
  }
}



function mapStateToProps(store) {
  return {

    user: store.Web3Reducer.user
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));

// export default Dashboard;
