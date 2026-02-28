@echo off
echo ========================================
echo Prescripto Complete Setup
echo ========================================
echo.

echo What I need from you:
echo.
echo 1. Cloudinary Credentials (for image uploads)
echo    - Get from: https://cloudinary.com/console
echo.
echo 2. That's it! Everything else is auto-configured.
echo.
pause

echo.
echo Creating .env file...
copy .env.docker .env

echo.
echo ========================================
echo IMPORTANT: Edit the .env file now!
echo ========================================
echo.
echo Open .env file and update:
echo 1. CLOUDINARY_NAME=your_cloudinary_name
echo 2. CLOUDINARY_API_KEY=your_cloudinary_api_key
echo 3. CLOUDINARY_API_SECRET=your_cloudinary_api_secret
echo.
echo Press any key after you've updated the .env file...
pause

echo.
echo Stopping any running containers...
docker-compose down -v

echo.
echo Building and starting all services...
docker-compose up -d --build

echo.
echo Waiting for services to start...
timeout /t 10

echo.
echo ========================================
echo Checking service status...
echo ========================================
docker-compose ps

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Access your application:
echo - Frontend: http://localhost:3000
echo - Admin: http://localhost:3001
echo - Backend: http://localhost:7060
echo.
echo Default Admin Login:
echo - Email: admin@prescripto.com
echo - Password: change_admin_password
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
echo.
pause
