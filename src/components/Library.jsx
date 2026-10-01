import React from 'react';
import { booksData } from '../data/books';
import { RoundBookCarousel } from './RoundBookCarousel';

export const Library = () => {
  return (
    <section id="library">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-lg">My Personal Library</h2>
          <p className="text-lead" style={{ maxWidth: '750px', margin: '0 auto' }}>
            A curated collection of literary works shaping my perspective on philosophy, classic literature, and computer science.
          </p>
        </div>
      </div>

      <div className="reveal">
        <RoundBookCarousel books={booksData} />
      </div>
    </section>
  );
};
