import { useState, useEffect } from 'react';
import { Page, Text, Slider } from '@geist-ui/react';
import books from '../data/books';
console.log(books);

export default function Home() {
  const [hasRun, setHasRun] = useState(false);
  const [speed, setSpeed] = useState(5000);

  useEffect(() => setTimeout(setSpeed(250), 500), []);
  return (
    <Page>
      <Text h1>How long would it take you to read each book in the Bible?</Text>
      <Text h2>Let's find out…</Text>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Text h4>My reading speed is</Text>
        <Text style={{ textAlign: 'right' }} h1>
          {speed}wpm
        </Text>
      </div>
      <input
        type="range"
        step="1"
        min={1}
        max={1200}
        value={speed}
        onChange={(v) => {
          setHasRun(true);
          setSpeed(v.target.value);
        }}
      />
      <div className={`bottom_section`}>
        {books.map((b) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: 42,
              width: '100%',
            }}
          >
            <div style={{ width: 130 }}>
              <strong>{b.Book__1}</strong>
            </div>

            {(() => {
              let minutes = parseInt(
                typeof b['Word count'] === 'string'
                  ? parseInt(b['Word count'].replace(/,/g, '')) / speed
                  : b['Word count'] / speed
              );
              if (minutes === 0) {
                return (
                  <>
                    <div style={{ width: 'calc(100% ' }} />
                    <div style={{ width: 50 }}>{`<1m`}</div>
                  </>
                );
              }
              const bar = (
                <div
                  className="bar"
                  style={{
                    width: `calc(${(minutes / 60) * 50}%)`,
                    background: 'blue',
                    opacity: 0.7,
                    height: 10,
                    marginRight: 5,
                    minWidth: '10px',
                    maxWidth: 'calc(100% - 200px)',
                  }}
                />
              );
              if (minutes < 60) {
                return (
                  <>
                    {bar}
                    <div style={{ width: 50 }}>{`${minutes}m`}</div>
                  </>
                );
              } else {
                return (
                  <>
                    {bar}
                    <div style={{ width: 50 }}>{`${parseFloat(
                      minutes / 60
                    ).toFixed(1)}h`}</div>
                  </>
                );
              }
            })()}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          width: '100%',
          textAlign: 'center',
          fontSize: 13,
        }}
      >
        <footer>
          <a
            href="https://github.com/N-Argyle/bible_time_to_read_nextjs"
            style={{ color: 'black', textDecoration: 'underline' }}
          >
            By N_Argyle on GitHub
          </a>
        </footer>
      </div>
    </Page>
  );
}
