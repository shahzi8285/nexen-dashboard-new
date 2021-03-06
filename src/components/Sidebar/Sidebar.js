import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dismissAlert } from '../../actions/alerts';
import { changeActiveSidebarItem } from '../../actions/navigation';
import { logoutUser } from '../../actions/user';
import logo from '../../images/logo.png';
import LinksGroup from './LinksGroup';
import s from './Sidebar.module.scss';
import { Col, Container, Row } from 'reactstrap';
import Widget from '../../components/Widget';
import avatar from '../../images/people/a5.jpg';
import { toast } from 'react-toastify';
import eth from '../../images/1 copy.png';
import './Sidebar.scss';


class Sidebar extends React.Component {
    static propTypes = {
        sidebarStatic: PropTypes.bool,
        sidebarOpened: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        activeItem: PropTypes.string,
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
    };

    static defaultProps = {
        sidebarStatic: false,
        activeItem: '',
    };

    constructor(props) {
        super(props);

        this.doLogout = this.doLogout.bind(this);
    }

    componentDidMount() {
        this.element.addEventListener('transitionend', () => {
            if (this.props.sidebarOpened) {
                this.element.classList.add(s.sidebarOpen);
            }
        }, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
            if (nextProps.sidebarOpened) {
                this.element.style.height = `${this.element.scrollHeight}px`;
            } else {
                this.element.classList.remove(s.sidebarOpen);
                setTimeout(() => {
                    this.element.style.height = '';
                }, 0);
            }
        }
    }



    copyToClipboard = (name, data) => {
        // const el =document.createElement('txtps');
        // el.value = data;
        // document.body.appendChild(el);
        // el.querySelectorAll(0,111111111);
        // document.execCommand("copy");
        // document.body.removeChild(el);
    
        navigator.clipboard.writeText(data).then(() => {
          toast.success(name + " copied successfully", {
            position: "bottom-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          });
        }).catch((err) => {
          toast.success(err, {
            position: "bottom-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          });
        })
    
      }




    dismissAlert(id) {
        this.props.dispatch(dismissAlert(id));
    }

    doLogout() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <nav
                className={cx(s.root)}
                ref={(nav) => {
                    this.element = nav;
                }}
            >
                {/* <header className={s.logo }>
                    <a href="https://demo.flatlogic.com/light-blue-react/">Light <span
                        className="fw-bold">Blue</span></a>


                </header> */}



                <ul className={s.nav}>
                    <img src={logo} className={"LinksGroup_headerLink__vI_3u .logo"}
                        style={{ padding: "25px", width: "80%", height: 'auto', 
                        animation: `spin ${8}s linear infinite` }} alt="Logo" />


                    <div  style={{marginLeft:20}}>
                        <span className={`${s.avatar} rounded-circle thumb-sm mr-2`}>
                            <img src={avatar} alt="..." style={{borderRadius:"50%"}} />
                        </span>
                        <span className={`small ${s.accountCheck}`}>Binod</span>
                    </div>


                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Dashboard"
                        isHeader
                        iconName="flaticon-home"
                        link="/app/main"
                        index="main"
                    />
                    {/* <h5 className={[s.navTitle, s.groupTitle].join(' ')}>TEMPLATE</h5> */}

                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Profile"
                        isHeader
                        iconName="flaticon-user"
                        link="/app/profile"
                        index="core"
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Logout"
                        isHeader
                        iconName="flaticon-exit"
                        link="/app/tables"
                        index="tables"
                    />



                    <hr className="solid" />


                  


                    <hr className="solid" />


                    <div className="id">
                <div className="id__header" >
                     <h3>Id {this.props.user ? this.props.user.id : "0"}</h3>
                </div>
                <div className="eth">
                   <img src={eth} ></img>
                   <div className="value">
                       <h4>3</h4>
                       
                       <h4>$123</h4>

                   </div>
                </div>
                <div className="id__btn">
                    <h4>0.35 eth</h4>
                </div>
            </div>




                    <Widget
                        title={"Affiliate Link"}
                    >

                        <p className="fw-semi-bold tile-hover" onClick={(f) => {
                            console.log("clickedddddd", f);
                            this.copyToClipboard("Affiliate Link", "https://nexen.live/0")


                        }}>

                            https://nexen.live/0
      </p>
                    </Widget>

                    <Widget
                        title={"Smart Contract Address"}
                    >

                        <p className="fw-semi-bold tile-hover" onClick={(f) => {
                            console.log("clickedddddd", f);
                            this.copyToClipboard("Smart Contract Address", this.props.user.contractAddress)


                        }}>

                            {this.props.user ? this.props.user.contractAddress : "0000000000"}

                        </p>
                    </Widget>

                    <Widget

                        title={"Etherium Wallet"}
                    >

                        <p className="fw-semi-bold tile-hover" onClick={(f) => {
                            this.copyToClipboard("Etherium Wallet Address", this.props.user.walletAddress)


                        }}>

                            {this.props.user ? this.props.user.walletAddress : "0000000000"}
                        </p>
                    </Widget>








                    {/* <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Help"
                        isHeader
                        iconName="flaticon-help"
                        link="/app/tables"
                        index="tables"
                    />


<LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Contact Us"
                        isHeader
                        iconName="flaticon-internet"
                        link="/app/icons"
                        index="tables"
                    /> */}
                    {/* <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Notifications"
                        isHeader
                        iconName="flaticon-layers"
                        link="/app/notifications"
                        index="ui"
                    /> */}
                    {/* <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Components"
                        isHeader
                        iconName="flaticon-list"
                        link="/app/forms"
                        index="forms"
                        childrenLinks={[
                            {
                                header: 'Charts', link: '/app/charts',
                            },
                            {
                                header: 'Icons', link: '/app/icons',
                            },
                            {
                                header: 'Maps', link: '/app/maps',
                            },
                        ]}
                    /> */}
                </ul>
                {/* <h5 className={s.navTitle}>
                    Other
                   
                </h5> */}



                {/* <ul className={s.sidebarLabels}>
                    <li>
                        <a href="#">
                            <i className="fa fa-circle text-success mr-2" />
                            <span className={s.labelName}>My Recent</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-circle text-primary mr-2" />
                            <span className={s.labelName}>Starred</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-circle text-danger mr-2" />
                            <span className={s.labelName}>Background</span>
                        </a>
                    </li>
                </ul>
                <h5 className={s.navTitle}>
                    PROJECTS
                </h5>
              
               */}




                {/* <div className={s.sidebarAlerts}>
                    {this.props.alertsList.map(alert => // eslint-disable-line
                        <Alert
                            key={alert.id}
                            className={s.sidebarAlert} color="transparent"
                            isOpen={true} // eslint-disable-line
                            toggle={() => {
                                this.dismissAlert(alert.id);
                            }}
                        >
                            <span>{alert.title}</span><br />
                            <Progress className={`bg-custom-dark progress-xs mt-1`} color={alert.color}
                                value={alert.value} />
                            <small>{alert.footer}</small>
                        </Alert>,
                    )}
                </div> */}



            </nav>
        );
    }
}

function mapStateToProps(store) {
    return {
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
        alertsList: store.alerts.alertsList,
        activeItem: store.navigation.activeItem,
        user: store.Web3Reducer.user

    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
