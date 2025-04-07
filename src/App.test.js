import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import CommentArea from "./components/CommentArea";
import fantasy from "./books/fantasy.json";
import '@testing-library/jest-dom';

describe('Main rendering tests', () => {
  it('renders Welcome component', () => {
    render(<App />);
    const mainHeader = screen.getByRole('heading', {
      name: /benvenuto nella nostra libreria digitale/i,
    });
    expect(mainHeader).toBeInTheDocument();
  });

  it('renders all books as Bootstrap cards', () => {
    render(<App />);
    const allTheBookCards = screen.getAllByTestId('single-book');
    const booksLength = fantasy.length;

    console.log(`Numero di card renderizzate: ${allTheBookCards.length}`);
    
    expect(allTheBookCards).toHaveLength(booksLength);
  });
});

describe('CommentArea rendering tests', () => {
  it('renders CommentArea component', () => {
    render(<CommentArea asin="some-asin" />);
    const headingElement = screen.getByRole('heading', { name: /recensioni/i });
    expect(headingElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/Scrivi un commento.../i);
    expect(inputElement).toBeInTheDocument();
  });
});

//--------------------------- test ricerca dei libri---------------------------
describe('Book search filtering via navbar', () => {
  it('shows only "The Last Wish: Introducing the Witcher" when searched', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, {
      target: { value: 'The Last Wish: Introducing the Witcher' },
    });

    const matchedBook = await screen.findByText(/The Last Wish: Introducing the Witcher/i);
    expect(matchedBook).toBeInTheDocument();

    const allBooks = screen.getAllByTestId('single-book');
    expect(allBooks).toHaveLength(1);
  });
// ---------------------------secondo test ricerca dei libri---------------------------
  it('shows only 2 books when searching for "Dungeons & Dragons"', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, {
      target: { value: 'Dungeons & Dragons' },
    });
    const filteredBooks = await screen.findAllByTestId('single-book');
    expect(filteredBooks).toHaveLength(2);
  });
  
});

// ---------------------------selezione del libro---------------------------
describe('Book card selection behavior', () => {
  it('adds red border to a book card when clicked', async () => {
    render(<App />);

    const cards = await screen.findAllByTestId('single-book');

    fireEvent.click(cards[0]);

    expect(cards[0].className).toMatch(/border-danger/);

    for (let i = 1; i < cards.length; i++) {
      expect(cards[i].className).not.toMatch(/border-danger/);
    }
  });
//---------------------------selezione seocndo libro---------------------------
  
  it('removes red border from previous card when another is clicked', async () => {
    render(<App />);
    const cards = await screen.findAllByTestId('single-book');
  
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);
  
    expect(cards[0].className).not.toMatch(/border-danger/);
    expect(cards[1].className).toMatch(/border-danger/);
  });
  
});


