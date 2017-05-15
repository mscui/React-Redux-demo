import 'Filter.css';
import { fetchBaseData, setSourceParams, setDateParams } from '/page/module/Actions/Actions.jsx';

let Button = ReactBootstrap.Button;
let ButtonGroup = ReactBootstrap.ButtonGroup;

const OPTIONS = [{ value: 'a', label: 'a' },
                      { value: 'b', label: 'b' },
                      { value: 'c', label: 'c' },
                      { value: 'd', label: 'd' },
                      { value: 'e', label: 'e' },
                      { value: 'f', label: 'f' },
                      { value: 'g', label: 'g' }];
class Filter extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            value: [],
            options: OPTIONS,
            seriesDay: 30
        }
        this.onChangeDate = this.onChangeDate.bind(this);
    }
    logChange(value) {
        this.setState({
            value: value
        });
        this.props.setSourceParams(value);

        this.props.fetchBaseData();
    }
    onChangeDate(seriesDay) {

        let today = new Date();
        let day = today.getDay() < 10 ? '0' + today.getDay() : today.getDay();
        let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
        let year = today.getFullYear();

        let dateFrom = '';
        let dateTo = year + month + day;
        let datePrev = 0;
        let m = 0;
        switch(seriesDay) {
            case 7:

                this.setState({
                    seriesDay: 7
                });
                datePrev = today.getDay() - 7;
                m = (+month - 1) < 10 ? '0' + (+month - 1) : (+month - 1);
                if (datePrev < 0) {
                    if (month === '01') {
                        dateFrom = (year - 1) + '12' + (31 - (7 - today.getDay()));
                    } else if (month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
                        dateFrom = year + m + (31 - (7 - today.getDay()));
                    } else {
                        dateFrom = year + m + (30 - (7 - today.getDay()));
                    }
                } else {
                    dateFrom = year + month + (datePrev < 10 ? '0' + datePrev : datePrev);
                }
                break;
            case 10:

                datePrev = today.getDay() - 10;
                m = (+month - 1) < 10 ? '0' + (+month - 1) : (+month - 1);
                if (datePrev < 0) {
                    if (month === '01') {
                        dateFrom = (year - 1) + '12' + (31 - (10 - today.getDay()));
                    } else if (month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
                        dateFrom = (year - 1) + m + (31 - (10 - today.getDay()));
                    } else {
                        dateFrom = (year - 1) + m + (30 - (10 - today.getDay()));
                    }
                } else {
                    dateFrom = year + month + (datePrev < 10 ? '0' + datePrev : datePrev);
                }

                this.setState({
                    seriesDay: 10
                });
                break;
            case 30:
                m = (+month - 1) < 10 ? '0' + (+month - 1) : (+month - 1);
                if (month === '01') {
                    dateFrom = (year - 1) + '12' + day;
                } else {
                    dateFrom = year + m + day;
                }
                this.setState({
                    seriesDay: 30
                });
                break;
        }

        this.props.setDateParams({
            dateFrom: dateFrom,
            dateTo: dateTo
        });
        this.props.fetchBaseData();
    }
    render() {
        return (
                <div>
                    <Select
                        multi
                        simpleValue
                        className="data-multiSelect"
                        name="form-field-name"
                        value={this.state.value}
                        options={this.state.options}
                        onChange={this.logChange.bind(this)}
                        placeholder="选择渠道..."
                    />
                    <ButtonGroup className="data-filter-button">
                        <Button onClick={(day) => this.onChangeDate(7)} active={this.state.seriesDay === 7 ? true : false}>7天</Button>
                        <Button onClick={(day) => this.onChangeDate(10)} active={this.state.seriesDay === 10 ? true : false}>10天</Button>
                        <Button onClick={(day) => this.onChangeDate(30)} active={this.state.seriesDay === 30 ? true : false}>一个月</Button>
                    </ButtonGroup>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        query: state.query,
        source: state.source
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setSourceParams: Redux.bindActionCreators(setSourceParams, dispatch),
        setDateParams: Redux.bindActionCreators(setDateParams, dispatch),
        fetchBaseData: Redux.bindActionCreators(fetchBaseData, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Filter)