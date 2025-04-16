

        // --- DOM Elements ---
        const addBookForm = document.getElementById('add-book-form');
        const bookList = document.getElementById('book-list');
        const noBooksRow = document.getElementById('no-books-row');
        const searchInput = document.getElementById('search-input');
        const statusFilter = document.getElementById('status-filter');
        const isbnInput = document.getElementById('isbn');
        const isbnError = document.getElementById('isbn-error');
        const currentYearSpan = document.getElementById('current-year');
        const notificationArea = document.getElementById('notification-area');
        const tableHeaders = document.querySelectorAll('#book-list-section th[data-sortable]');
        const clearDataButton = document.getElementById('clear-data-button'); // Clear data button

        // Student Management Elements
        const addStudentForm = document.getElementById('add-student-form');
        const studentNameInput = document.getElementById('student-name');
        const studentIdInput = document.getElementById('student-id');
        const studentIdError = document.getElementById('student-id-error');
        const studentListBody = document.getElementById('student-list');
        const noStudentsRow = document.getElementById('no-students-row');

        // Edit Modal elements
        const editModal = document.getElementById('edit-book-modal');
        const editForm = document.getElementById('edit-book-form');
        const editIsbnHidden = document.getElementById('edit-isbn-hidden');
        const editTitleInput = document.getElementById('edit-title');
        const editAuthorInput = document.getElementById('edit-author');
        const editGenreInput = document.getElementById('edit-genre');
        const editYearInput = document.getElementById('edit-year');

        // Borrow Modal elements
        const borrowModal = document.getElementById('borrow-book-modal');
        const borrowForm = document.getElementById('borrow-book-form');
        const borrowIsbnHidden = document.getElementById('borrow-isbn-hidden');
        const borrowBookTitle = document.getElementById('borrow-book-title');
        const borrowerSelect = document.getElementById('borrower-select');
        const borrowDurationDisplay = document.getElementById('borrow-duration-display');


        // --- Constants ---
        const BOOK_STORAGE_KEY = 'libraryBooksWithStudents_v2'; // Updated key for safety
        const STUDENT_STORAGE_KEY = 'libraryStudents_v2';     // Updated key for safety
        const BORROW_DURATION_DAYS = 14;
        const FINE_PER_DAY = 1;
        const FINE_CURRENCY = '₹';

        // --- State ---
        let currentSortColumn = null;
        let currentSortDirection = 'asc';

        // --- SVG Icons ---
        const ICONS = {
           add: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="action-icon"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>`,
           borrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="action-icon"><path fill-rule="evenodd" d="M15.75 2a.75.75 0 01.75.75v14.5a.75.75 0 01-1.5 0V14.5H4.75a.75.75 0 010-1.5h10.5V2.75a.75.75 0 01.75-.75zm-8.25 7a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75V3.5a.75.75 0 011.5 0v6.25h3.75z" clip-rule="evenodd" /></svg>`,
           return: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="action-icon"><path fill-rule="evenodd" d="M16.704 4.296a.75.75 0 010 1.06L8.06 14.06l-4.81-4.81a.75.75 0 111.06-1.06l3.75 3.75 7.644-7.644a.75.75 0 011.06 0z" clip-rule="evenodd" /></svg>`,
           edit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="action-icon"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg>`,
           delete: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="action-icon"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.237-2.37.465a.75.75 0 00-.5.858l.318 3.181a.75.75 0 00.744.642h10.616a.75.75 0 00.744-.642l.318-3.18a.75.75 0 00-.5-.858c-.79-.228-1.575-.388-2.37-.465v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.5.66 1.5 1.5v.443c-.745.074-1.486.21-2.225.397A.75.75 0 008.5 7.118V14.5a.75.75 0 001.5 0V7.118a.75.75 0 00-.777-.727c-.74-.187-1.48-.323-2.223-.397V5.5c0-.84.66-1.5 1.5-1.5z" clip-rule="evenodd" /></svg>`,
           deleteSm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="action-icon-sm"><path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.5-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" /></svg>`, // Smaller delete for students
           success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toast-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
           error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toast-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>`,
           info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toast-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`,
           warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toast-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>`
        };

        // --- Utility Functions ---

        /** Shows a styled notification toast. */
        const showNotification = (message, type = 'info') => {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            // Ensure icon exists before trying to use it
            const iconHTML = ICONS[type] ? ICONS[type] : '';
            toast.innerHTML = `${iconHTML}<span>${message}</span>`;
            notificationArea.appendChild(toast);
            // Automatically remove the toast after the animation duration (5s)
            setTimeout(() => {
                toast.remove();
            }, 5000);
        };

        /** Gets data from local storage with error handling. */
        const getData = (key) => {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                console.error(`Error parsing ${key} from localStorage:`, e);
                showNotification(`Error loading data for ${key}. Data might be corrupted.`, 'error');
                return []; // Return empty array on error
            }
        };

        /** Saves data to local storage with error handling. */
        const saveData = (key, data) => {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (e) {
                 console.error(`Error saving ${key} to localStorage:`, e);
                 showNotification(`Error saving data for ${key}. Changes might not persist.`, 'error');
                 return false;
            }
        };


        /** Gets books from local storage. Ensures new fields exist. */
        const getBooks = () => {
            const books = getData(BOOK_STORAGE_KEY);
             // Ensure all books have the required fields (simple migration)
             return books.map(book => ({
                 title: book.title || '',
                 author: book.author || '',
                 isbn: book.isbn || '',
                 genre: book.genre || null,
                 year: book.year || null,
                 status: book.status || 'available',
                 borrowerId: book.borrowerId !== undefined ? book.borrowerId : null,
                 borrowerName: book.borrowerName !== undefined ? book.borrowerName : null,
                 borrowDate: book.borrowDate !== undefined ? book.borrowDate : null,
                 dueDate: book.dueDate !== undefined ? book.dueDate : null,
             }));
        };

        /** Saves books to local storage. */
        const saveBooks = (books) => {
            return saveData(BOOK_STORAGE_KEY, books);
        };

        /** Gets students from local storage. */
        const getStudents = () => {
            const students = getData(STUDENT_STORAGE_KEY);
              // Ensure all students have the required fields
             return students.map(student => ({
                 id: student.id || '',
                 name: student.name || '',
                 borrowedBooks: Array.isArray(student.borrowedBooks) ? student.borrowedBooks : [] // Ensure array
             }));
        };

        /** Saves students to local storage. */
        const saveStudents = (students) => {
            return saveData(STUDENT_STORAGE_KEY, students);
        };

         /** Checks if student ID exists. */
        const doesStudentIdExist = (studentId) => {
            const students = getStudents();
            return students.some(student => student.id === studentId);
        };

        /** Checks if ISBN exists (excluding current book being edited). */
        const doesIsbnExist = (isbn, currentIsbn = null) => {
            const books = getBooks();
            return books.some(book => book.isbn === isbn && book.isbn !== currentIsbn);
        };

        /** Formats date to YYYY-MM-DD or returns 'N/A'. */
        const formatDate = (dateInput) => {
            if (!dateInput) return 'N/A';
            try {
                const date = new Date(dateInput);
                if (isNaN(date.getTime())) return 'N/A';
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            } catch (e) { return 'N/A'; }
        };

        /** Calculates fine for overdue books. */
        const calculateFine = (dueDateString) => {
             if (!dueDateString) return 0;
            try {
                const dueDate = new Date(dueDateString);
                dueDate.setHours(23, 59, 59, 999);
                const today = new Date();
                if (isNaN(dueDate.getTime())) return 0;
                if (today > dueDate) {
                    const diffTime = Math.abs(today - dueDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays * FINE_PER_DAY;
                }
                return 0;
            } catch (e) { return 0; }
        };

        /** Opens a specified modal. */
        const openModal = (modalId) => {
             const modal = document.getElementById(modalId);
            if (modal) { modal.style.display = 'flex'; }
        };

        /** Closes a specified modal. */
        const closeModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                const form = modal.querySelector('form');
                if(form) form.reset();
            }
        };

        /** Finds a student by their ID. */
        const findStudentById = (studentId) => {
            const students = getStudents();
            return students.find(student => student.id === studentId);
        };

        // --- Sorting Logic ---
        const sortBooks = (books, column, direction) => {
            const sortedBooks = [...books];
            sortedBooks.sort((a, b) => {
                let valA = a[column]; let valB = b[column];
                if (valA == null) return direction === 'asc' ? -1 : 1; if (valB == null) return direction === 'asc' ? 1 : -1;
                if (column === 'year') { valA = parseInt(valA) || 0; valB = parseInt(valB) || 0; }
                else if (column === 'dueDate') { valA = new Date(valA); valB = new Date(valB); if (isNaN(valA.getTime())) return direction === 'asc' ? -1 : 1; if (isNaN(valB.getTime())) return direction === 'asc' ? 1 : -1; }
                else { valA = String(valA).toLowerCase(); valB = String(valB).toLowerCase(); }
                if (valA < valB) return direction === 'asc' ? -1 : 1; if (valA > valB) return direction === 'asc' ? 1 : -1; return 0;
            }); return sortedBooks;
         };
        const handleSortClick = (event) => {
             const header = event.currentTarget; const column = header.dataset.column; if (!column) return;
            let direction = 'asc'; if (currentSortColumn === column && currentSortDirection === 'asc') { direction = 'desc'; }
            currentSortColumn = column; currentSortDirection = direction;
            tableHeaders.forEach(th => { th.removeAttribute('data-sort-dir'); }); header.setAttribute('data-sort-dir', direction);
            renderBooks();
        };

        // --- Core Functions ---

        /** Renders the student list table and the borrow modal dropdown. */
        const renderStudents = () => {
            const students = getStudents();
            studentListBody.innerHTML = ''; // Clear student table
            borrowerSelect.innerHTML = '<option value="" disabled selected>-- Select a student --</option>'; // Clear and add default option to dropdown

            if (students.length === 0) {
                noStudentsRow.classList.remove('hidden'); // Show the 'no students' message row
            } else {
                noStudentsRow.classList.add('hidden'); // Hide the message row
                students.sort((a, b) => a.name.localeCompare(b.name)).forEach(student => {
                    // Add row to student table
                    const row = document.createElement('tr');
                    row.className = 'bg-white border-b hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">${student.id}</td>
                        <td class="px-4 py-2">${student.name}</td>
                        <td class="px-4 py-2 text-center">${student.borrowedBooks.length}</td>
                        <td class="px-4 py-2 text-center">
                            <button onclick="deleteStudent('${student.id}')" class="text-red-600 hover:text-red-800 text-xs inline-flex items-center ${student.borrowedBooks.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}" title="${student.borrowedBooks.length > 0 ? 'Cannot delete student with borrowed books' : 'Delete Student'}" ${student.borrowedBooks.length > 0 ? 'disabled' : ''}>
                                ${ICONS.deleteSm} Delete
                            </button>
                        </td>
                    `;
                    studentListBody.appendChild(row);

                    // Add option to borrow modal select
                    const option = document.createElement('option');
                    option.value = student.id;
                    option.textContent = `${student.name} (${student.id})`;
                    borrowerSelect.appendChild(option);
                });
            }
        };

        /** Renders the book list table. */
        const renderBooks = () => {
            let books = getBooks();
            const searchTerm = searchInput.value.toLowerCase();
            const selectedStatus = statusFilter.value;

            // 1. Filter
            const filteredBooks = books.filter(book => {
                const borrowerInfo = book.borrowerName ? `${book.borrowerName.toLowerCase()} ${book.borrowerId ? book.borrowerId.toLowerCase() : ''}` : '';
                const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                                      book.author.toLowerCase().includes(searchTerm) ||
                                      book.isbn.toLowerCase().includes(searchTerm) ||
                                      borrowerInfo.includes(searchTerm);
                const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;
                return matchesSearch && matchesStatus;
            });

            // 2. Sort
            const sortedAndFilteredBooks = currentSortColumn
                ? sortBooks(filteredBooks, currentSortColumn, currentSortDirection)
                : filteredBooks;

            // 3. Render
            bookList.innerHTML = '';
            if (sortedAndFilteredBooks.length === 0) {
                noBooksRow.classList.remove('hidden'); // Show message
            } else {
                noBooksRow.classList.add('hidden'); // Hide message
                sortedAndFilteredBooks.forEach(book => {
                    const fine = book.status === 'borrowed' ? calculateFine(book.dueDate) : 0;
                    const row = document.createElement('tr');
                    if (fine > 0) row.classList.add('bg-red-50');

                    const borrowerDisplay = book.borrowerName ? `${book.borrowerName} ${book.borrowerId ? `(${book.borrowerId})` : ''}` : 'N/A';

                    row.innerHTML = `
                        <td class="px-3 py-2 whitespace-normal break-words text-gray-900">${book.title}</td>
                        <td class="px-3 py-2 whitespace-normal break-words text-gray-500">${book.author}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-gray-500">${book.isbn}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-gray-500">${book.genre || 'N/A'}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-gray-500">${book.year || 'N/A'}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-center font-medium"><span class="status-badge ${book.status === 'available' ? 'status-available' : 'status-borrowed'}">${book.status}</span></td>
                        <td class="px-3 py-2 whitespace-nowrap text-gray-500" title="${book.borrowerId || ''}">${borrowerDisplay}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-gray-500">${formatDate(book.dueDate)}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-center ${fine > 0 ? 'fine-amount' : 'text-gray-500'}">${fine > 0 ? FINE_CURRENCY + fine.toFixed(2) : '-'}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-center font-medium space-x-1">
                            ${book.status === 'available'
                                ? `<button onclick="openBorrowModal('${book.isbn}')" class="text-indigo-600 hover:text-indigo-800 text-xs inline-flex items-center" title="Borrow Book">${ICONS.borrow} Borrow</button>`
                                : `<button onclick="returnBook('${book.isbn}')" class="text-green-600 hover:text-green-800 text-xs inline-flex items-center" title="Return Book">${ICONS.return} Return</button>`
                            }
                             <button onclick="openEditBookModal('${book.isbn}')" class="text-blue-600 hover:text-blue-800 text-xs inline-flex items-center" title="Edit Book Details">${ICONS.edit} Edit</button>
                            <button onclick="deleteBook('${book.isbn}')" class="text-red-600 hover:text-red-800 text-xs inline-flex items-center" title="Delete Book">${ICONS.delete} Delete</button>
                        </td>
                    `;
                    bookList.appendChild(row);
                });
            }
        };

        /** Adds a new student. */
        const addStudent = (event) => {
            event.preventDefault();
            const studentName = studentNameInput.value.trim();
            const studentId = studentIdInput.value.trim();

            if (!studentName || !studentId) { showNotification('Please fill in both Student Name and ID.', 'error'); return; }
            if (doesStudentIdExist(studentId)) { studentIdError.classList.remove('hidden'); showNotification('This Student ID already exists.', 'error'); return; }
            else { studentIdError.classList.add('hidden'); }

            const students = getStudents();
            const newStudent = { id: studentId, name: studentName, borrowedBooks: [] };
            students.push(newStudent);

            if (saveStudents(students)) {
                renderStudents(); // Update student list and dropdown
                addStudentForm.reset();
                studentIdError.classList.add('hidden');
                showNotification(`Student "${studentName}" (${studentId}) added successfully!`, 'success');
            }
        };

        /** Deletes a student if they have no borrowed books. */
        const deleteStudent = (studentId) => {
            const students = getStudents();
            const studentToDelete = students.find(s => s.id === studentId);

            if (!studentToDelete) {
                showNotification(`Error: Student with ID ${studentId} not found.`, 'error');
                return;
            }

            // Prevent deletion if student has books out
            if (studentToDelete.borrowedBooks.length > 0) {
                showNotification(`Cannot delete student "${studentToDelete.name}". They still have ${studentToDelete.borrowedBooks.length} book(s) borrowed.`, 'warning');
                return;
            }

            if (confirm(`Are you sure you want to delete student "${studentToDelete.name}" (${studentId})? This action cannot be undone.`)) {
                 const updatedStudents = students.filter(student => student.id !== studentId);
                 if(saveStudents(updatedStudents)) {
                    renderStudents(); // Re-render student list
                    showNotification(`Student "${studentToDelete.name}" deleted.`, 'success');
                 }
            }
        };


        /** Adds a new book. */
        const addBook = (event) => {
            event.preventDefault();
            // Validate form using HTML5 validation API
            if (!addBookForm.checkValidity()) {
                addBookForm.reportValidity(); // Show browser validation messages
                showNotification('Please correct the errors in the form.', 'error');
                return;
            }

            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const isbn = isbnInput.value.trim();
            const genre = document.getElementById('genre').value.trim();
            const year = document.getElementById('year').value.trim();

            // Check for duplicate ISBN again (client-side)
            if (doesIsbnExist(isbn)) { isbnError.classList.remove('hidden'); showNotification('A book with this ISBN already exists.', 'error'); return; }
            else { isbnError.classList.add('hidden'); }

            const books = getBooks();
            const newBook = { title, author, isbn, genre: genre || null, year: year ? parseInt(year) : null, status: 'available', borrowerId: null, borrowerName: null, borrowDate: null, dueDate: null };
            books.push(newBook);

            if(saveBooks(books)) {
                renderBooks();
                addBookForm.reset();
                isbnError.classList.add('hidden');
                showNotification(`Book "${title}" added successfully!`, 'success');
            }
        };

        /** Deletes a book, ensuring student record is also updated if borrowed. */
        const deleteBook = (isbn) => {
            const books = getBooks();
            const bookToDelete = books.find(b => b.isbn === isbn);
            if (!bookToDelete) { showNotification(`Error: Book with ISBN ${isbn} not found.`, 'error'); return; }

            let confirmMessage = `Are you sure you want to delete "${bookToDelete.title}"? This action cannot be undone.`;
            if (bookToDelete.status === 'borrowed') { confirmMessage = `"${bookToDelete.title}" is currently borrowed by ${bookToDelete.borrowerName} (${bookToDelete.borrowerId}). Deleting the book will also remove it from their record. Are you sure?`; }

            if (confirm(confirmMessage)) {
                let studentsUpdated = true; // Assume success unless proven otherwise
                let students = getStudents();

                // If book was borrowed, remove it from the student's record
                if (bookToDelete.borrowerId) {
                    const studentIndex = students.findIndex(s => s.id === bookToDelete.borrowerId);
                    if (studentIndex !== -1) {
                        students[studentIndex].borrowedBooks = students[studentIndex].borrowedBooks.filter(bookIsbn => bookIsbn !== isbn);
                        studentsUpdated = saveStudents(students); // Try saving updated student data
                    } else {
                         showNotification(`Warning: Could not find student (${bookToDelete.borrowerId}) associated with the deleted book. Student record not updated.`, 'warning');
                         studentsUpdated = false; // Indicate potential issue
                    }
                }

                // Only proceed with book deletion if student update was successful (or not needed)
                if (studentsUpdated) {
                    const updatedBooks = books.filter(book => book.isbn !== isbn);
                    if (saveBooks(updatedBooks)) {
                        renderBooks(); // Re-render book list
                        renderStudents(); // Re-render student list (in case counts changed)
                        showNotification(`Book "${bookToDelete.title}" deleted.`, 'success');
                    }
                } else {
                     showNotification(`Book deletion aborted due to error updating student record.`, 'error');
                }
            }
        };

       /** Opens the borrow modal, populating book title and borrow duration. */
        const openBorrowModal = (isbn) => {
            const books = getBooks();
            const bookToBorrow = books.find(book => book.isbn === isbn);

            if (bookToBorrow && bookToBorrow.status === 'available') {
                if (getStudents().length === 0) { showNotification("No students registered. Please add a student before borrowing.", 'warning'); return; }
                borrowIsbnHidden.value = isbn;
                borrowBookTitle.textContent = `"${bookToBorrow.title}"`;
                borrowDurationDisplay.textContent = BORROW_DURATION_DAYS;
                borrowerSelect.value = "";
                openModal('borrow-book-modal');
            } else {
                showNotification("Book is not available for borrowing or not found.", 'warning');
            }
        };

        /** Handles borrow form submission: links book and student. */
        const handleBorrowSubmit = (event) => {
             event.preventDefault();
             const isbn = borrowIsbnHidden.value;
             const selectedStudentId = borrowerSelect.value;

             if (!selectedStudentId) { showNotification("Please select a student.", 'error'); return; }

             let books = getBooks();
             let students = getStudents();
             const bookIndex = books.findIndex(book => book.isbn === isbn);
             const studentIndex = students.findIndex(student => student.id === selectedStudentId);

             if (bookIndex !== -1 && studentIndex !== -1 && books[bookIndex].status === 'available') {
                const student = students[studentIndex];
                const borrowDate = new Date();
                const dueDate = new Date(borrowDate);
                dueDate.setDate(borrowDate.getDate() + BORROW_DURATION_DAYS);

                // Update book record
                books[bookIndex].status = 'borrowed';
                books[bookIndex].borrowerId = student.id;
                books[bookIndex].borrowerName = student.name;
                books[bookIndex].borrowDate = borrowDate.toISOString();
                books[bookIndex].dueDate = dueDate.toISOString();

                // Update student record
                students[studentIndex].borrowedBooks.push(isbn);

                // Save both - check for success
                const booksSaved = saveBooks(books);
                const studentsSaved = saveStudents(students);

                if (booksSaved && studentsSaved) {
                    renderBooks();
                    renderStudents();
                    closeModal('borrow-book-modal');
                    showNotification(`"${books[bookIndex].title}" borrowed by ${student.name}.`, 'success');
                } else {
                     showNotification("Error saving data during borrow operation. Please try again.", 'error');
                     // Optional: Attempt to revert changes if possible (complex)
                }
             } else {
                 showNotification("Error borrowing book. Book or student not found, or book not available.", 'error');
                 closeModal('borrow-book-modal');
             }
        };


        /** Returns a book: updates book and student records. */
        const returnBook = (isbn) => {
            let books = getBooks();
            let students = getStudents();
            const bookIndex = books.findIndex(book => book.isbn === isbn);

            if (bookIndex !== -1 && books[bookIndex].status === 'borrowed') {
                const book = books[bookIndex];
                const fine = calculateFine(book.dueDate);
                const borrowerId = book.borrowerId;
                const borrowerName = book.borrowerName;

                if (fine > 0) { showNotification(`Book "${book.title}" returned by ${borrowerName}. Overdue Fine: ${FINE_CURRENCY}${fine.toFixed(2)}`, 'warning'); }
                else { showNotification(`Book "${book.title}" returned by ${borrowerName}.`, 'success'); }

                // Update book record first
                books[bookIndex].status = 'available';
                books[bookIndex].borrowerId = null;
                books[bookIndex].borrowerName = null;
                books[bookIndex].borrowDate = null;
                books[bookIndex].dueDate = null;
                const bookSaved = saveBooks(books);

                let studentSaved = true; // Assume success if no student update needed or if successful
                // Update student record (if borrowerId exists)
                if (borrowerId) {
                    const studentIndex = students.findIndex(s => s.id === borrowerId);
                    if (studentIndex !== -1) {
                        students[studentIndex].borrowedBooks = students[studentIndex].borrowedBooks.filter(bookIsbn => bookIsbn !== isbn);
                        studentSaved = saveStudents(students);
                    } else {
                         showNotification(`Warning: Could not find student (${borrowerId}) associated with the returned book. Student record not updated.`, 'warning');
                         studentSaved = false;
                    }
                }

                // Only re-render if saves were successful
                if (bookSaved && studentSaved) {
                    renderBooks();
                    renderStudents();
                } else {
                     showNotification(`Error saving data during return operation. Please check data consistency.`, 'error');
                }
            } else {
                 showNotification("Book is not currently borrowed or not found.", 'error');
            }
        };


        /** Opens the edit book modal. */
        const openEditBookModal = (isbn) => {
            const books = getBooks(); const bookToEdit = books.find(book => book.isbn === isbn);
            if (bookToEdit) {
                editIsbnHidden.value = bookToEdit.isbn; editTitleInput.value = bookToEdit.title; editAuthorInput.value = bookToEdit.author;
                editGenreInput.value = bookToEdit.genre || ''; editYearInput.value = bookToEdit.year || '';
                openModal('edit-book-modal');
            } else { showNotification('Book not found!', 'error'); }
        };

        /** Handles edit book form submission. */
        const handleEditSubmit = (event) => {
            event.preventDefault();
             // Validate form using HTML5 validation API
            if (!editForm.checkValidity()) {
                editForm.reportValidity();
                showNotification('Please correct the errors in the form.', 'error');
                return;
            }
            const originalIsbn = editIsbnHidden.value; const updatedTitle = editTitleInput.value.trim();
            const updatedAuthor = editAuthorInput.value.trim(); const updatedGenre = editGenreInput.value.trim(); const updatedYear = editYearInput.value.trim();

            let books = getBooks(); const bookIndex = books.findIndex(book => book.isbn === originalIsbn);
            if (bookIndex !== -1) {
                books[bookIndex].title = updatedTitle; books[bookIndex].author = updatedAuthor; books[bookIndex].genre = updatedGenre || null; books[bookIndex].year = updatedYear ? parseInt(updatedYear) : null;
                if(saveBooks(books)) {
                    renderBooks(); closeModal('edit-book-modal'); showNotification(`Book "${updatedTitle}" details updated.`, 'success');
                }
            } else { showNotification('Error updating book. Original book not found.', 'error'); }
        };

        /** Clears all data from localStorage after double confirmation. */
        const clearAllData = () => {
            if (confirm("⚠ ARE YOU SURE? This will delete ALL books and ALL students permanently!")) {
                 if (confirm("⚠ FINAL WARNING: Delete all data? This cannot be undone.")) {
                    try {
                        localStorage.removeItem(BOOK_STORAGE_KEY);
                        localStorage.removeItem(STUDENT_STORAGE_KEY);
                        // Reset state variables if needed
                        currentSortColumn = null;
                        currentSortDirection = 'asc';
                        // Re-render everything to show empty state
                        renderBooks();
                        renderStudents();
                        showNotification("All library data has been cleared.", "success");
                    } catch (e) {
                        console.error("Error clearing localStorage:", e);
                        showNotification("An error occurred while clearing data.", "error");
                    }
                 } else {
                      showNotification("Clear data cancelled.", "info");
                 }
            } else {
                 showNotification("Clear data cancelled.", "info");
            }
        };


        // --- Event Listeners ---
        addBookForm.addEventListener('submit', addBook);
        addStudentForm.addEventListener('submit', addStudent);
        searchInput.addEventListener('input', renderBooks);
        statusFilter.addEventListener('change', renderBooks);
        editForm.addEventListener('submit', handleEditSubmit);
        borrowForm.addEventListener('submit', handleBorrowSubmit);
        clearDataButton.addEventListener('click', clearAllData); // Listener for clear data

        // Add sort listeners to book table headers
        tableHeaders.forEach(header => {
            header.addEventListener('click', handleSortClick);
        });

        // Close modals on outside click or Escape key
        window.onclick = function(event) { if (event.target.classList.contains('modal')) { closeModal(event.target.id); } }
        window.addEventListener('keydown', function (event) { if (event.key === 'Escape') { closeModal('edit-book-modal'); closeModal('borrow-book-modal'); } });

        // --- Initial Setup ---
        borrowDurationDisplay.textContent = BORROW_DURATION_DAYS; // Set initial borrow duration display
        currentYearSpan.textContent = new Date().getFullYear();
        renderBooks();    // Initial render of books
        renderStudents(); // Initial render of students and borrow dropdown

