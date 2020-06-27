interface ICard {
  id: number;
  icon: string;
  title: string;
  text: string;
}

interface CardProps {
  id: number;
  index: number;
  icon: string;
  title: string;
  text: string;
  selected: boolean;
  select: (selected: boolean) => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const getStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      left: `calc(${props.index * 20}% - ${props.index * 20}px)`,
      zIndex: props.index
    }
    
    if(props.selected){
      styles.left = "50%";
      styles.zIndex = 10;
    }
    
    return styles;
  }
  
  const handleOnClick = (): void => {
    if(!props.selected){
      props.select(props.id);
    }
  }
  
  const handleClose = (): void => {
    if(props.selected){
      props.select();
    }
  }
  
  const getContent = (): JSX.Element | null => {
    if(props.selected){
      return(
        <div className="content">
          <div className="title">
            <h1>{props.title}</h1>
          </div>
          <div className="text">
            <p>{props.text}</p>
          </div>
          <button type="button" className="close-button" onClick={handleClose}>
            <i className="fas fa-times" />
          </button>
        </div>
      )
    }
  
    return null;
  }
  
  const classes: string = classNames("card-wrapper", { selected: props.selected });
  
  return(
    <div className={classes} style={getStyles()} onClick={handleOnClick}>
      <div className="card">
        <div className="icon">
          <i className={props.icon} />
        </div>
        {getContent()}
      </div>
    </div>
  )
}

interface AppProps {
  
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const cards: ICard[] = [
    { id: 1, icon: "fas fa-bus-alt", title: "Bus", text: "A bus." },
    { id: 2, icon: "fas fa-plane", title: "Plane", text: "A bus that flies." },
    { id: 3, icon: "fas fa-taxi", title: "Taxi", text: "A small bus that costs more than a bus." },
    { id: 4, icon: "fas fa-train", title: "Train", text: "A bunch of buses tied together." },
    { id: 5, icon: "fas fa-bicycle", title: "Bicycle", text: "The smallest of buses with two wheels." }
  ]
  
  const [selectedCard, setSelectedCard] = React.useState<ICard | null>(null);
  
  const selectCard = (id: string): void => {
    if(id){
      setSelectedCard(cards.find((card: ICard) => card.id === id));
    } else {
      setSelectedCard(null);
    }
  }
  
  const getCards = (): JSX.Element[] => {
    return cards.map((card: ICard, index: number) => {
      return(
        <Card 
          key={card.id}
          id={card.id}
          index={index}
          icon={card.icon}
          title={card.title}
          text={card.text}
          selected={selectedCard && selectedCard.id === card.id}
          select={selectCard}
        />
      )
    })
  }
  
  return(
    <div id="app">
      <div id="cards-wrapper">
        <div id="cards">
          {getCards()}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"));
