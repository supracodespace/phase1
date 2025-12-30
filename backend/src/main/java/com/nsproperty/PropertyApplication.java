@SpringBootApplication
public class PropertyApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(PropertyApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(PropertyApplication.class, args);
    }
}
