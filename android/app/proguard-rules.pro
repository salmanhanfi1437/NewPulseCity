# --- Razorpay SDK ---
-keep class com.razorpay.** { *; }
-keep interface com.razorpay.** { *; }
-dontwarn com.razorpay.**

# --- React Native ---
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# --- OkHttp / Retrofit (if used by your backend) ---
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# --- Gson (for JSON parsing in some SDKs) ---
-keep class com.google.gson.** { *; }
-keep interface com.google.gson.** { *; }
-dontwarn com.google.gson.**

# --- Keep annotation classes (used for reflection) ---
-keepattributes *Annotation*
