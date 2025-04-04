// =============================================
// DOM Elements
// =============================================
const dom = {
    // Navigation
    navMenu: document.getElementById('navMenu'),
    menuToggle: document.getElementById('menuToggle'),
    homeLink: document.getElementById('homeLink'),
    eventsLink: document.getElementById('eventsLink'),
    adminLink: document.getElementById('adminLink'),
    authButtons: document.getElementById('authButtons'),
    userInfo: document.getElementById('userInfo'),
    usernameDisplay: document.getElementById('usernameDisplay'),
    loginBtnNav: document.getElementById('loginBtnNav'),
    signupBtnNav: document.getElementById('signupBtnNav'),
    logoutBtn: document.getElementById('logoutBtn'),
  
    // Pages
    homePage: document.getElementById('homePage'),
    eventsPage: document.getElementById('eventsPage'),
    adminDashboard: document.getElementById('adminDashboard'),
  
    // Notification
    notificationBar: document.getElementById('notificationBar'),
    notificationText: document.getElementById('notificationText'),
    notificationClose: document.getElementById('notificationClose'),
  
    // Events
    homeEventsGrid: document.getElementById('homeEventsGrid'),
    eventsGrid: document.getElementById('eventsGrid'),
    searchEvent: document.getElementById('searchEvent'),
    filterCategory: document.getElementById('filterCategory'),
    viewAllEvents: document.getElementById('viewAllEvents'),
  
    // Admin
    totalEvents: document.getElementById('totalEvents'),
    upcomingEvents: document.getElementById('upcomingEvents'),
    totalRegistrations: document.getElementById('totalRegistrations'),
    activeUsers: document.getElementById('activeUsers'),
    eventName: document.getElementById('eventName'),
    eventDate: document.getElementById('eventDate'),
    eventCategory: document.getElementById('eventCategory'),
    eventDescription: document.getElementById('eventDescription'),
    addEventBtn: document.getElementById('addEventBtn'),
    adminEventsGrid: document.getElementById('adminEventsGrid'),
  
    // Modals
    eventPopup: document.getElementById('eventPopup'),
    popupClose: document.getElementById('popupClose'),
    popupImage: document.getElementById('popupImage'),
    popupTitle: document.getElementById('popupTitle'),
    popupDate: document.getElementById('popupDate'),
    popupCategory: document.getElementById('popupCategory'),
    popupRegistrations: document.getElementById('popupRegistrations'),
    popupDescription: document.getElementById('popupDescription'),
    popupRegCount: document.getElementById('popupRegCount'),
    popupRegNumber: document.getElementById('popupRegNumber'),
    popupRegisterBtn: document.getElementById('popupRegisterBtn'),
  
    // Auth Modals
    loginModal: document.getElementById('loginModal'),
    loginClose: document.getElementById('loginClose'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    loginSubmit: document.getElementById('loginSubmit'),
    showSignup: document.getElementById('showSignup'),
  
    signupModal: document.getElementById('signupModal'),
    signupClose: document.getElementById('signupClose'),
    signupName: document.getElementById('signupName'),
    signupEmail: document.getElementById('signupEmail'),
    signupPassword: document.getElementById('signupPassword'),
    signupConfirm: document.getElementById('signupConfirm'),
    isAdminSignup: document.getElementById('isAdminSignup'),
    adminCodeGroup: document.getElementById('adminCodeGroup'),
    adminCode: document.getElementById('adminCode'),
    signupSubmit: document.getElementById('signupSubmit'),
    showLogin: document.getElementById('showLogin')
  };
  
  // =============================================
  // State Management
  // =============================================
  const state = {
    currentUser: null,
    events: [],
    users: [],
    adminCode: 'fusion2023',
    currentEvent: null
  };
  
  // =============================================
  // Initialization
  // =============================================
  document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupEventListeners();
    checkAuthState();
  });
  
  function initializeData() {
    // Load or initialize data from localStorage
    state.events = JSON.parse(localStorage.getItem('events')) || [];
    state.users = JSON.parse(localStorage.getItem('users')) || [];
    state.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    state.adminCode = localStorage.getItem('adminCode') || 'fusion2023';
  
    // Set default data if empty
    if (state.events.length === 0) {
      setDefaultEvents();
    }
  
    if (state.users.length === 0) {
      setDefaultUsers();
    }
  }
  
  function setDefaultEvents() {
    state.events = [
      {
        id: 1,
        name: 'Welcome to Fusion Club!',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: 'Tech',
        description: 'Join us for our inaugural event and learn what Fusion Club is all about! Meet fellow members, learn about our upcoming activities, and enjoy some refreshments.',
        registrations: []
      },
      {
        id: 2,
        name: 'AI Workshop',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: 'Tech',
        description: 'Learn the basics of artificial intelligence and machine learning in this hands-on workshop. No prior experience required!',
        registrations: []
      },
      {
        id: 3,
        name: 'Game Design Challenge',
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: 'Gaming',
        description: 'Design and prototype a game in just 48 hours! Work in teams or solo to create something amazing.',
        registrations: []
      }
    ];
    localStorage.setItem('events', JSON.stringify(state.events));
  }
  
  function setDefaultUsers() {
    state.users = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@fusionclub.com',
        password: 'admin123', // Note: In production, always hash passwords
        isAdmin: true,
        registeredEvents: []
      }
    ];
    localStorage.setItem('users', JSON.stringify(state.users));
  }
  
  // =============================================
  // Event Listeners Setup
  // =============================================
  function setupEventListeners() {
    // Navigation
    dom.menuToggle.addEventListener('click', toggleMobileMenu);
    dom.homeLink.addEventListener('click', showHomePage);
    dom.eventsLink.addEventListener('click', showEventsPage);
    dom.adminLink.addEventListener('click', showAdminDashboard);
    dom.loginBtnNav.addEventListener('click', showLoginModal);
    dom.signupBtnNav.addEventListener('click', showSignupModal);
    dom.logoutBtn.addEventListener('click', handleLogout);
    dom.viewAllEvents.addEventListener('click', showEventsPage);
  
    // Notification
    dom.notificationClose.addEventListener('click', hideNotification);
  
    // Events
    dom.searchEvent.addEventListener('input', filterEvents);
    dom.filterCategory.addEventListener('change', filterEvents);
  
    // Admin
    dom.addEventBtn.addEventListener('click', addNewEvent);
    dom.isAdminSignup.addEventListener('change', toggleAdminCodeField);
  
    // Modals
    dom.popupClose.addEventListener('click', closeEventPopup);
    dom.popupRegisterBtn.addEventListener('click', registerForEvent);
    dom.loginClose.addEventListener('click', closeLoginModal);
    dom.loginSubmit.addEventListener('click', handleLogin);
    dom.showSignup.addEventListener('click', switchToSignupModal);
    dom.signupClose.addEventListener('click', closeSignupModal);
    dom.signupSubmit.addEventListener('click', handleSignup);
    dom.showLogin.addEventListener('click', switchToLoginModal);
  
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === dom.eventPopup) closeEventPopup();
      if (e.target === dom.loginModal) closeLoginModal();
      if (e.target === dom.signupModal) closeSignupModal();
    });
  
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!dom.eventPopup.classList.contains('hidden')) closeEventPopup();
        if (!dom.loginModal.classList.contains('hidden')) closeLoginModal();
        if (!dom.signupModal.classList.contains('hidden')) closeSignupModal();
      }
    });
  }
  
  // =============================================
  // Authentication Functions
  // =============================================
  function checkAuthState() {
    if (state.currentUser) {
      updateAuthUI(state.currentUser);
      if (state.currentUser.isAdmin) {
        dom.adminLink.classList.remove('hidden');
      }
    }
    
    // Load appropriate content
    loadHomeEvents();
    
    // Show latest event notification if available
    if (state.events.length > 0) {
      const latestEvent = getLatestEvent();
      showNotification(`New event: ${latestEvent.name} on ${formatDate(latestEvent.date)}`);
    }
  }
  
  function updateAuthUI(user) {
    if (user) {
      dom.authButtons.classList.add('hidden');
      dom.userInfo.classList.remove('hidden');
      dom.usernameDisplay.textContent = user.name;
    } else {
      dom.authButtons.classList.remove('hidden');
      dom.userInfo.classList.add('hidden');
    }
  }
  
  function handleLogin() {
    const email = dom.loginEmail.value.trim();
    const password = dom.loginPassword.value.trim();
    
    if (!email || !password) {
      showAlert('Please fill all fields');
      return;
    }
    
    const user = state.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      showAlert('Invalid email or password');
      return;
    }
    
    // Update current user in state and localStorage
    state.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update UI
    updateAuthUI(user);
    closeLoginModal();
    
    // Show appropriate page
    if (user.isAdmin) {
      dom.adminLink.classList.remove('hidden');
      showAdminDashboard();
    } else {
      showEventsPage();
    }
    
    // Clear form
    dom.loginEmail.value = '';
    dom.loginPassword.value = '';
  }
  
  function handleSignup() {
    const name = dom.signupName.value.trim();
    const email = dom.signupEmail.value.trim();
    const password = dom.signupPassword.value.trim();
    const confirm = dom.signupConfirm.value.trim();
    const isAdmin = dom.isAdminSignup.checked;
    const code = dom.adminCode.value.trim();
    
    // Validation
    if (!name || !email || !password || !confirm) {
      showAlert('Please fill all fields');
      return;
    }
    
    if (password !== confirm) {
      showAlert('Passwords do not match');
      return;
    }
    
    if (isAdmin && code !== state.adminCode) {
      showAlert('Invalid admin code');
      return;
    }
    
    // Check if email exists
    if (state.users.some(u => u.email === email)) {
      showAlert('Email already registered');
      return;
    }
    
    // Create new user
    const newUser = {
      id: state.users.length > 0 ? Math.max(...state.users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password, // Note: In production, hash this password
      isAdmin,
      registeredEvents: []
    };
    
    // Update state and localStorage
    state.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(state.users));
    
    // Log in the new user
    state.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Update UI
    updateAuthUI(newUser);
    closeSignupModal();
    
    // Clear form
    dom.signupName.value = '';
    dom.signupEmail.value = '';
    dom.signupPassword.value = '';
    dom.signupConfirm.value = '';
    dom.isAdminSignup.checked = false;
    dom.adminCodeGroup.classList.add('hidden');
    dom.adminCode.value = '';
    
    // Show appropriate page
    if (newUser.isAdmin) {
      dom.adminLink.classList.remove('hidden');
      showAdminDashboard();
    } else {
      showEventsPage();
    }
  }
  
  function handleLogout() {
    state.currentUser = null;
    localStorage.setItem('currentUser', JSON.stringify(null));
    updateAuthUI(null);
    dom.adminLink.classList.add('hidden');
    showHomePage();
  }
  
  // =============================================
  // Page Navigation Functions
  // =============================================
  function showHomePage(e) {
    if (e) e.preventDefault();
    hideAllPages();
    dom.homePage.classList.remove('hidden');
    loadHomeEvents();
  }
  
  function showEventsPage(e) {
    if (e) e.preventDefault();
    
    if (!state.currentUser) {
      showLoginModal();
      return;
    }
    
    hideAllPages();
    dom.eventsPage.classList.remove('hidden');
    loadEvents();
  }
  
  function showAdminDashboard(e) {
    if (e) e.preventDefault();
    
    if (!state.currentUser || !state.currentUser.isAdmin) {
      showAlert('Only admins can access this page');
      return;
    }
    
    hideAllPages();
    dom.adminDashboard.classList.remove('hidden');
    loadAdminStats();
    loadAdminEvents();
  }
  
  function hideAllPages() {
    dom.homePage.classList.add('hidden');
    dom.eventsPage.classList.add('hidden');
    dom.adminDashboard.classList.add('hidden');
  }
  
  // =============================================
  // Event Management Functions
  // =============================================
  function loadHomeEvents() {
    // Show only 3 latest events on home page
    const latestEvents = [...state.events]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    
    dom.homeEventsGrid.innerHTML = '';
    
    if (latestEvents.length === 0) {
      dom.homeEventsGrid.innerHTML = '<p class="text-center py-8">No upcoming events. Check back later!</p>';
      return;
    }
    
    latestEvents.forEach(event => {
      const eventCard = createEventCard(event);
      dom.homeEventsGrid.appendChild(eventCard);
    });
  }
  
  function loadEvents() {
    dom.eventsGrid.innerHTML = '';
    
    if (state.events.length === 0) {
      dom.eventsGrid.innerHTML = '<p class="col-span-full text-center py-8">No events found. Check back later!</p>';
      return;
    }
    
    state.events.forEach(event => {
      const eventCard = createEventCard(event);
      dom.eventsGrid.appendChild(eventCard);
    });
  }
  
  function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card rounded-xl shadow-md overflow-hidden cursor-pointer';
    eventCard.innerHTML = `
      <div class="event-image h-48 ${getCategoryColorClass(event.category)} flex items-center justify-center text-white text-xl font-bold">
        ${event.category}
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">${event.name}</h3>
        <div class="text-gray-300 text-sm mb-2">${formatDate(event.date)}</div>
        <span class="inline-block bg-orange-500/30 text-white px-2 py-1 rounded-full text-xs mb-4">${event.category}</span>
        <p class="text-gray-300 text-sm line-clamp-3">${event.description}</p>
      </div>
    `;
    
    eventCard.addEventListener('click', () => openEventPopup(event));
    return eventCard;
  }
  
  function filterEvents() {
    const searchTerm = dom.searchEvent.value.toLowerCase();
    const category = dom.filterCategory.value;
    
    const filteredEvents = state.events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm) || 
                          event.description.toLowerCase().includes(searchTerm);
      const matchesCategory = category === '' || event.category === category;
      return matchesSearch && matchesCategory;
    });
    
    dom.eventsGrid.innerHTML = '';
    
    if (filteredEvents.length === 0) {
      dom.eventsGrid.innerHTML = '<p class="col-span-full text-center py-8">No events found matching your criteria.</p>';
      return;
    }
    
    filteredEvents.forEach(event => {
      const eventCard = createEventCard(event);
      dom.eventsGrid.appendChild(eventCard);
    });
  }
  
  function getLatestEvent() {
    return state.events.reduce((latest, event) => {
      return new Date(event.date) > new Date(latest.date) ? event : latest;
    }, state.events[0]);
  }
  
  // =============================================
  // Admin Functions
  // =============================================
  function loadAdminStats() {
    // Total events
    dom.totalEvents.textContent = state.events.length;
    
    // Upcoming events (future dates)
    const upcoming = state.events.filter(event => new Date(event.date) >= new Date());
    dom.upcomingEvents.textContent = upcoming.length;
    
    // Total registrations
    const totalRegs = state.events.reduce((sum, event) => sum + (event.registrations ? event.registrations.length : 0), 0);
    dom.totalRegistrations.textContent = totalRegs;
    
    // Active users (users with at least one registration)
    const active = state.users.filter(user => {
      return state.events.some(event => 
        event.registrations && event.registrations.includes(user.id)
      );
    }).length;
    dom.activeUsers.textContent = active;
  }
  
  function loadAdminEvents() {
    dom.adminEventsGrid.innerHTML = '';
    
    if (state.events.length === 0) {
      dom.adminEventsGrid.innerHTML = '<p class="col-span-full text-center py-8">No events found. Add your first event!</p>';
      return;
    }
    
    state.events.forEach(event => {
      const registeredUsers = event.registrations ? 
        event.registrations.map(regId => {
          const user = state.users.find(u => u.id === regId);
          return user ? user.name : 'Unknown';
        }) : [];
      
      const eventCard = document.createElement('div');
      eventCard.className = 'bg-white/15 rounded-xl shadow-md overflow-hidden';
      eventCard.innerHTML = `
        <div class="event-image h-48 ${getCategoryColorClass(event.category)} flex items-center justify-center text-white text-xl font-bold">
          ${event.category}
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">${event.name}</h3>
          <div class="text-gray-300 text-sm mb-2">${formatDate(event.date)}</div>
          <span class="inline-block bg-orange-500/15 text-white px-2 py-1 rounded-full text-xs mb-4">${event.category}</span>
          <div class="text-gray-300 text-sm mb-4">${event.description}</div>
          <div class="mt-4">
            <strong class="text-gray-300">Registrations (${registeredUsers.length}):</strong>
            ${registeredUsers.length > 0 ? 
              `<ul class="mt-2 pl-5 space-y-1">
                ${registeredUsers.map(user => `<li class="text-gray-400">${user}</li>`).join('')}
              </ul>` : 
              '<p class="text-gray-500 mt-2">No registrations yet</p>'}
          </div>
          <button class="w-full mt-4 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:opacity-90 transition delete-event" data-id="${event.id}">
            Delete Event
          </button>
        </div>
      `;
      
      dom.adminEventsGrid.appendChild(eventCard);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-event').forEach(btn => {
      btn.addEventListener('click', deleteEvent);
    });
  }
  
  function addNewEvent() {
    const name = dom.eventName.value.trim();
    const date = dom.eventDate.value;
    const category = dom.eventCategory.value;
    const description = dom.eventDescription.value.trim();
    
    if (!name || !date || !description) {
      showAlert('Please fill all fields');
      return;
    }
    
    const newId = state.events.length > 0 ? Math.max(...state.events.map(event => event.id)) + 1 : 1;
    
    const newEvent = {
      id: newId,
      name,
      date,
      category,
      description,
      registrations: []
    };
    
    state.events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(state.events));
    
    // Clear form
    dom.eventName.value = '';
    dom.eventDate.value = '';
    dom.eventDescription.value = '';
    
    // Show notification
    showNotification(`New event added: ${name} on ${formatDate(date)}`);
    
    // Reload admin views
    loadAdminStats();
    loadAdminEvents();
    
    // Update home page
    loadHomeEvents();
  }
  
  function deleteEvent(e) {
    if (!confirm('Are you sure you want to delete this event? All registrations will be lost.')) return;
    
    const eventId = parseInt(e.target.dataset.id);
    
    // Remove event
    state.events = state.events.filter(event => event.id !== eventId);
    localStorage.setItem('events', JSON.stringify(state.events));
    
    // Update users' registered events
    state.users.forEach(user => {
      if (user.registeredEvents) {
        user.registeredEvents = user.registeredEvents.filter(id => id !== eventId);
      }
    });
    localStorage.setItem('users', JSON.stringify(state.users));
    
    // Update current user if logged in
    if (state.currentUser && state.currentUser.registeredEvents) {
      state.currentUser.registeredEvents = state.currentUser.registeredEvents.filter(id => id !== eventId);
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    }
    
    // Reload admin views
    loadAdminStats();
    loadAdminEvents();
  }
  
  // =============================================
  // Event Popup Functions
  // =============================================
  function openEventPopup(event) {
    if (!state.currentUser) {
      showLoginModal();
      return;
    }
    
    state.currentEvent = event;
    const isRegistered = event.registrations && event.registrations.includes(state.currentUser.id);
    
    // Update popup content
    dom.popupImage.className = `modal-image ${getCategoryColorClass(event.category)}`;
    dom.popupImage.textContent = event.category;
    dom.popupTitle.textContent = event.name;
    dom.popupDate.textContent = formatDate(event.date);
    dom.popupCategory.textContent = event.category;
    dom.popupRegistrations.textContent = event.registrations ? event.registrations.length : 0;
    dom.popupDescription.textContent = event.description;
    dom.popupRegNumber.textContent = event.registrations ? event.registrations.length : 0;
    
    // Update register button
    if (isRegistered) {
      dom.popupRegisterBtn.textContent = 'Registered!';
      dom.popupRegisterBtn.classList.add('bg-gray-300', 'text-gray-700');
      dom.popupRegisterBtn.classList.remove('btn-primary');
      dom.popupRegisterBtn.disabled = true;
    } else {
      dom.popupRegisterBtn.textContent = 'Register';
      dom.popupRegisterBtn.classList.remove('bg-gray-300', 'text-gray-700');
      dom.popupRegisterBtn.classList.add('btn-primary');
      dom.popupRegisterBtn.disabled = false;
    }
    
    // Show popup
    dom.eventPopup.classList.remove('hidden');
  }
  
  function closeEventPopup() {
    dom.eventPopup.classList.add('hidden');
    state.currentEvent = null;
  }
  
  function registerForEvent() {
    if (!state.currentUser || !state.currentEvent) return;
    
    const eventId = state.currentEvent.id;
    const eventIndex = state.events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) return;
    
    // Initialize registrations array if not exists
    if (!state.events[eventIndex].registrations) {
      state.events[eventIndex].registrations = [];
    }
    
    // Check if already registered
    if (state.events[eventIndex].registrations.includes(state.currentUser.id)) {
      return;
    }
    
    // Register user
    state.events[eventIndex].registrations.push(state.currentUser.id);
    localStorage.setItem('events', JSON.stringify(state.events));
    
    // Update user's registered events
    const userIndex = state.users.findIndex(user => user.id === state.currentUser.id);
    
    if (userIndex !== -1) {
      if (!state.users[userIndex].registeredEvents) {
        state.users[userIndex].registeredEvents = [];
      }
      state.users[userIndex].registeredEvents.push(eventId);
      localStorage.setItem('users', JSON.stringify(state.users));
      
      // Update current user data
      state.currentUser.registeredEvents = state.users[userIndex].registeredEvents;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    }
    
    // Update popup UI
    dom.popupRegisterBtn.textContent = 'Registered!';
    dom.popupRegisterBtn.classList.add('bg-gray-300', 'text-gray-700');
    dom.popupRegisterBtn.classList.remove('btn-primary');
    dom.popupRegisterBtn.disabled = true;
    
    // Update registrations count
    const regCount = state.events[eventIndex].registrations.length;
    dom.popupRegistrations.textContent = regCount;
    dom.popupRegNumber.textContent = regCount;
    
    // Reload admin dashboard if open
    if (!dom.adminDashboard.classList.contains('hidden')) {
      loadAdminStats();
      loadAdminEvents();
    }
  }
  
  // =============================================
  // Modal Functions
  // =============================================
  function showLoginModal() {
    dom.loginModal.classList.remove('hidden');
  }
  
  function closeLoginModal() {
    dom.loginModal.classList.add('hidden');
  }
  
  function showSignupModal() {
    dom.signupModal.classList.remove('hidden');
  }
  
  function closeSignupModal() {
    dom.signupModal.classList.add('hidden');
  }
  
  function switchToSignupModal(e) {
    e.preventDefault();
    closeLoginModal();
    showSignupModal();
  }
  
  function switchToLoginModal(e) {
    e.preventDefault();
    closeSignupModal();
    showLoginModal();
  }
  
  function toggleAdminCodeField() {
    dom.adminCodeGroup.classList.toggle('hidden', !dom.isAdminSignup.checked);
  }
  
  // =============================================
  // UI Helper Functions
  // =============================================
  function toggleMobileMenu() {
    dom.navMenu.classList.toggle('hidden');
    dom.navMenu.classList.toggle('flex');
  }
  
  function showNotification(message) {
    dom.notificationText.textContent = message;
    dom.notificationBar.classList.remove('hidden');
    setTimeout(hideNotification, 5000);
  }
  
  function hideNotification() {
    dom.notificationBar.classList.add('hidden');
  }
  
  function showAlert(message) {
    alert(message); // In a real app, replace with a custom alert component
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  function getCategoryColorClass(category) {
    const colors = {
      'Tech': 'gradient-dark',
      'Design': 'gradient-dark',
      'Gaming': 'gradient-dark',
      'Workshop': 'gradient-dark'
    };
    return colors[category] || 'gradient-orange';
  }