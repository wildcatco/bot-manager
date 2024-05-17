import { createRangeArray } from '../utils/createRangeArray.ts';
import { getDaysInMonth } from '../utils/getDaysInMonth.ts';
import { useState, MouseEvent } from 'react';
import { nanoid } from 'nanoid';
import { BASE_URL } from '../constants/url.ts';
import { useSWRConfig } from 'swr';

const AddAlarm = () => {
  const { mutate } = useSWRConfig();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  const [enteredMessage, setEnteredMessage] = useState('');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const addAlarm = async (e: MouseEvent) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: nanoid(),
        message: enteredMessage,
        year: selectedYear,
        month: selectedMonth,
        date: selectedDate,
        hour: selectedHour,
        minute: selectedMinute,
      }),
    });

    if (response.ok) {
      alert('알람이 성공적으로 등록되었습니다.');
      mutate('/notification');
      setEnteredMessage('');
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth);
      setSelectedDate(currentDate);
      setSelectedHour(0);
      setSelectedMinute(0);
    } else {
      alert('알람 등록이 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section>
      <h1>알람 등록</h1>
      <form>
        <div>
          <label htmlFor={'message'}>알람 메세지</label>
          <textarea
            id={'message'}
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          />
        </div>

        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
          >
            {createRangeArray(currentYear, currentYear + 10).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span>년</span>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(+e.target.value)}
          >
            {createRangeArray(1, 12).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span>월</span>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(+e.target.value)}
          >
            {createRangeArray(
              1,
              getDaysInMonth(selectedMonth, selectedYear),
            ).map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <span>일</span>

          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(+e.target.value)}
          >
            {createRangeArray(0, 23).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span>시</span>

          <select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(+e.target.value)}
          >
            {createRangeArray(0, 59).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span>분</span>
        </div>

        <button onClick={addAlarm}>등록</button>
      </form>
    </section>
  );
};

export default AddAlarm;
