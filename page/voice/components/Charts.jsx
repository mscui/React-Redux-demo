
import { fetchVolume } from '/page/module/Actions/Actions.jsx';
let firstRender = 0;
export default class Charts extends React.Component {
    constructor(props) {
        super(props);
    }
    renderChart(volumeChart) {
        let volumeChartData = volumeChart || this.props.volumeChart;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main'));
        // debugger;
        let legendData = Object.keys(volumeChartData);

        let xAxisData = [];
        for (let value in volumeChartData) {
            volumeChartData[value].map((item, index) => {
                xAxisData.push(item.event_day);
            });
            break;
        }

        let series = [];

        for (let i = 0; i < legendData.length; i++) {
            let data = [];
            volumeChartData[legendData[i]].map((item, index) => {
                data.push(+item.uv);
            });

            series.push({
                name: legendData[i],
                type: 'line',
                data: data
            });
        }
        // 指定图表的配置项和数据
        let option = {
                title: {
                    text: '搜索UV趋势'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendData
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisData
                },
                yAxis: {
                    type: 'value',
                    scale: true
                },
                series: series
            };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    componentDidMount() {
        this.renderChart();
    }
    componentWillReceiveProps(nextProps) {
        // debugger;
        if (Object.keys(nextProps.volumeChart).length !== 0) {
            this.renderChart(nextProps.volumeChart);
        }
    }
    render() {
        return (
            <div id="main" style={{width: '100%',height:'400px'}}></div>
        )
    }
}
const mapStateToProps = state => {
    return {
        pageSize: state.page.pageSize,
        pageNo: state.page.pageNo,
        query: state.query,
        source: state.source,
        volumeChart: state.volumeChart.volumeChart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchVolume: Redux.bindActionCreators(fetchVolume, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Charts)