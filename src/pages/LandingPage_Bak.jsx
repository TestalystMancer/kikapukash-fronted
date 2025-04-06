<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KikapuKash - Group Savings & Contribution Tracking</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        /* Global Styles */
        :root {
            --forest-green: #228B22;
            --amber: #FFBF00;
            --bronze: #CD7F32;
            --white: #FFFFFF;
            --dark: #333333;
            --light-gray: #f5f5f5;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, var(--forest-green) 0%, var(--amber) 50%, var(--bronze) 100%);
            color: var(--dark);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        p {
            margin-bottom: 1.5rem;
        }
        
        .btn {
            background-color: var(--forest-green);
            color: var(--white);
            padding: 12px 24px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            display: inline-block;
            text-decoration: none;
        }
        
        .btn:hover {
            background-color: var(--amber);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .section {
            padding: 80px 0;
            background-color: var(--white);
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 50px;
            font-size: 2.5rem;
            color: var(--forest-green);
        }
        
        .text-center {
            text-align: center;
        }
        
        /* Header Styles */
        header {
            background-color: var(--white);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 2rem;
            font-weight: 700;
            color: var(--forest-green);
            text-decoration: none;
        }
        
        .logo span {
            color: var(--amber);
        }
        
        .nav-links {
            display: flex;
            list-style: none;
        }
        
        .nav-links li {
            margin-left: 30px;
        }
        
        .nav-links a {
            color: var(--dark);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: var(--forest-green);
        }
        
        /* Hero Section */
        .hero {
            background-color: transparent;
            color: var(--white);
            padding: 150px 0 100px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .hero-cta {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        
        .hero::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 0;
        }
        
        /* Features Section */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .feature-card {
            background-color: var(--light-gray);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            font-size: 3rem;
            color: var(--amber);
            margin-bottom: 20px;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--forest-green);
        }
        
        /* How It Works Section */
        .steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .step {
            text-align: center;
            position: relative;
        }
        
        .step::after {
            content: "";
            position: absolute;
            top: 50px;
            right: -15px;
            width: 30px;
            height: 2px;
            background-color: var(--amber);
            display: none;
        }
        
        .step:last-child::after {
            display: none;
        }
        
        .step-number {
            width: 50px;
            height: 50px;
            background-color: var(--forest-green);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 auto 20px;
        }
        
        .step-icon {
            font-size: 2.5rem;
            color: var(--bronze);
            margin-bottom: 15px;
        }
        
        .step h3 {
            margin-bottom: 10px;
            color: var(--forest-green);
        }
        
        /* Testimonials Section */
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 50px;
        }
        
        .testimonial-card {
            background-color: var(--light-gray);
            padding: 30px;
            border-radius: 10px;
            position: relative;
        }
        
        .testimonial-text {
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
        }
        
        .author-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
            background-color: var(--amber);
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--white);
            font-weight: 700;
        }
        
        .author-info h4 {
            margin-bottom: 5px;
            color: var(--forest-green);
        }
        
        .author-info p {
            font-size: 0.9rem;
            margin-bottom: 0;
            color: var(--bronze);
        }
        
        .quote-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 2rem;
            color: rgba(205, 127, 50, 0.2);
        }
        
        /* Download Section */
        .download {
            text-align: center;
            background: linear-gradient(to right, var(--forest-green), var(--amber));
            color: var(--white);
        }
        
        .download h2 {
            color: var(--white);
        }
        
        .download-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
        
        .download-btn {
            background-color: var(--white);
            color: var(--forest-green);
            display: flex;
            align-items: center;
            padding: 12px 24px;
            border-radius: 30px;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .download-btn:hover {
            background-color: var(--amber);
            color: var(--white);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .download-btn i {
            font-size: 1.5rem;
            margin-right: 10px;
        }
        
        /* Footer Section */
        footer {
            background-color: var(--dark);
            color: var(--white);
            padding: 50px 0 20px;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .footer-column h3 {
            color: var(--amber);
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 10px;
        }
        
        .footer-links a {
            color: var(--white);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: var(--amber);
        }
        
        .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .social-icons a {
            color: var(--white);
            font-size: 1.2rem;
            transition: color 0.3s ease;
        }
        
        .social-icons a:hover {
            color: var(--amber);
        }
        
        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
            text-align: center;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        /* Responsive Styles */
        @media screen and (max-width: 992px) {
            .features-grid,
            .steps,
            .testimonials-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .footer-content {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media screen and (max-width: 768px) {
            header {
                padding: 15px 0;
            }
            
            .navbar {
                flex-direction: column;
            }
            
            .nav-links {
                margin-top: 15px;
            }
            
            .nav-links li {
                margin-left: 15px;
                margin-right: 15px;
            }
            
            .hero {
                padding: 100px 0 80px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .section {
                padding: 60px 0;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .download-buttons {
                flex-direction: column;
                align-items: center;
            }
        }
        
        @media screen and (max-width: 576px) {
            .features-grid,
            .steps,
            .testimonials-grid {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
            }
            
            .hero-cta {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <a href="#" class="logo">Kikapu<span>Kash</span></a>
                <ul class="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#download">Download</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Group Savings Made Simple</h1>
                <p>Easily manage your savings groups, track contributions, and withdraw funds safely with KikapuKash. The perfect platform for community-based financial management.</p>
                <div class="hero-cta">
                    <a href="#" class="btn">Create a Group</a>
                    <a href="#" class="btn" style="background-color: var(--amber);">Join Existing Group</a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="section" id="features">
        <div class="container">
            <h2 class="section-title">Our Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Group Management</h3>
                    <p>Create new savings groups, invite members, or join existing groups with ease. Set group goals, rules, and contribution schedules.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Contribution Tracking</h3>
                    <p>Monitor individual and group contributions in real-time. Set reminders for due dates and view detailed reports on group progress.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-hand-holding-usd"></i>
                    </div>
                    <h3>Withdrawal Requests</h3>
                    <p>Request withdrawals whenever you need them. Track the status of your withdrawal requests with full transparency.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-user-shield"></i>
                    </div>
                    <h3>Admin Approval</h3>
                    <p>Group administrators can approve or decline withdrawal requests, manage members, and oversee group activities.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <h3>Notifications & Reminders</h3>
                    <p>Receive timely notifications about contribution deadlines, withdrawal approvals, and other important group activities.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-lock"></i>
                    </div>
                    <h3>Secure Transactions</h3>
                    <p>All financial transactions are encrypted and secure. Your financial information is always protected with KikapuKash.</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- How It Works Section -->
    <section class="section" id="how-it-works">
        <div class="container">
            <h2 class="section-title">How It Works</h2>
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h3>Create or Join a Group</h3>
                    <p>Set up your own savings group or join an existing one with a simple invitation code.</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-icon">
                        <i class="fas fa-money-bill-wave"></i>
                    </div>
                    <h3>Make Contributions</h3>
                    <p>Contribute to your group according to the set schedule. Track your contributions and group progress.</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-icon">
                        <i class="fas fa-comments-dollar"></i>
                    </div>
                    <h3>Request Withdrawals</h3>
                    <p>When you need funds, submit a withdrawal request that will be reviewed by group admins.</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="section" id="testimonials">
        <div class="container">
            <h2 class="section-title">What Our Users Say</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="quote-icon">
                        <i class="fas fa-quote-right"></i>
                    </div>
                    <p class="testimonial-text">KikapuKash has revolutionized how our community savings group operates. The transparency and ease of tracking has eliminated all the confusion we used to have.</p>
                    <div class="testimonial-author">
                        <div class="author-image">JM</div>
                        <div class="author-info">
                            <h4>Jane Mwangi</h4>
                            <p>Group Leader, Nairobi</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="quote-icon">
                        <i class="fas fa-quote-right"></i>
                    </div>
                    <p class="testimonial-text">I've been part of savings groups for years, but KikapuKash makes everything so much easier. I can see my contributions, track group progress, and request withdrawals all in one place.</p>
                    <div class="testimonial-author">
                        <div class="author-image">DO</div>
                        <div class="author-info">
                            <h4>David Ochieng</h4>
                            <p>Group Member, Kisumu</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="quote-icon">
                        <i class="fas fa-quote-right"></i>
                    </div>
                    <p class="testimonial-text">As a group administrator, KikapuKash has saved me countless hours of bookkeeping and made managing withdrawal requests much more organized. Highly recommended!</p>
                    <div class="testimonial-author">
                        <div class="author-image">FK</div>
                        <div class="author-info">
                            <h4>Faith Kamau</h4>
                            <p>Group Admin, Mombasa</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Download Section -->
    <section class="section download" id="download">
        <div class="container">
            <h2 class="section-title">Get Started Today</h2>
            <p>Download our app or create an account online to start managing your savings groups efficiently.</p>
            <div class="download-buttons">
                <a href="#" class="download-btn">
                    <i class="fab fa-google-play"></i>
                    <div>
                        <small>Download on</small>
                        <strong>Google Play</strong>
                    </div>
                </a>
                <a href="#" class="download-btn">
                    <i class="fab fa-apple"></i>
                    <div>
                        <small>Download on</small>
                        <strong>App Store</strong>
                    </div>
                </a>
                <a href="#" class="download-btn">
                    <i class="fas fa-laptop"></i>
                    <div>
                        <small>Create Account</small>
                        <strong>Web Version</strong>
                    </div>
                </a>
            </div>
        </div>
    </section>
    
    <!-- Footer Section -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>KikapuKash</h3>
                    <p>The ultimate platform for group savings and contribution tracking. Simplify your group finances today.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#download">Download</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Security</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Contact Us</h3>
                    <ul class="footer-links">
                        <li><a href="mailto:info@kikapukash.com">info@kikapukash.com</a></li>
                        <li><a href="tel:+254700000000">+254 700 000 000</a></li>
                        <li><a href="#">Support Center</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 KikapuKash. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>