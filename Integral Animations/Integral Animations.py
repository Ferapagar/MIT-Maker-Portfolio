from manimlib.imports import *;

class myScene(GraphScene):
    CONFIG = {
        "x_min": -1,
        "x_max": 3,
        "x_axis_width": 11,
        "x_tick_frequency": 1,
        "x_leftmost_tick": -.5,  # Change if different from x_min
        "x_labeled_nums": [x for x in range(-1, 4)],
        "x_axis_label": "$x$",
        "y_min": -1,
        "y_max": 5,
        "y_axis_height": 6,
        "y_tick_frequency": 1,
        "y_bottom_tick": -.5,  # Change if different from y_min
        "y_labeled_nums": [x for x in range(-1, 6)],
        "y_axis_label": "$y$",
        "axes_color": WHITE,
        "graph_origin": DOWN*2+LEFT*2,
        "rel_graph_origin": [0,0,0],
        "exclude_zero_label": True,
        "default_graph_colors": [BLUE, GREEN, YELLOW],
        "default_derivative_color": GREEN,
        "default_input_color": YELLOW,
        "default_riemann_start_color": BLUE,
        "default_riemann_end_color": GREEN,
        "area_opacity": 0.8,
        "num_rects": 50,
    }
    def construct(self):
        self.setup_axes(animate = True)

        f = lambda x: 4 - 2*x
        f_graph = self.get_graph(f, color=RED)
        f_label = self.get_graph_label(f_graph, label = "y_1=4-2x", x_val = 0, buff=MED_LARGE_BUFF)

        g = lambda x: x*x*x / (1+x*x)
        g_graph = self.get_graph(g)
        g_label = self.get_graph_label(g_graph, label = "y_2={{x^3}\\over{1+x^2}}", direction=UP ,x_val = 3, buff=MED_LARGE_BUFF)

        R = TexMobject("R").shift(LEFT+DOWN*.3).scale(1.5)

        intersection = Dot(point=self.coords_to_point(1.4876644, 1.0246712))
        c_label = TexMobject("(1.488, 1.024)").scale(.7)
        c_label.add_updater(lambda t: t.next_to(intersection, RIGHT))

        rs = self.get_riemann_rectangles(f_graph,g,x_min = 0, x_max = 1.4876644, start_color=YELLOW, end_color=ORANGE, input_sample_type="right",stroke_color=WHITE,dx=.01,stroke_width=0)
        rs2 = self.get_riemann_rectangles(f_graph,g,x_min = 0, x_max = 1.4876644, start_color=YELLOW, end_color=ORANGE, input_sample_type="right",stroke_color=WHITE,dx=.1,stroke_width=0)

        sample_label = TexMobject("x=", color = BLUE)
        sample_valueTracker = ValueTracker(value = .3, color=BLUE, decimal_places=3)
        def val_updater(num):
            num.set_value(sample_valueTracker.get_value())

        sample_value = DecimalNumber(sample_valueTracker.get_value(),)
        sample_value.add_updater(val_updater)
        sample_label = VGroup(sample_label, sample_value).arrange()
        sample_label.to_edge(buff = SMALL_BUFF)
        sample_label.shift(1.85*UP)

        sample_rectangle = Rectangle(width = 2, height = 4)
        def recengle_updater(rect):
            x = sample_valueTracker.get_value()
            w = .1
            low = g(x+w)
            high = f(x+w)
            rect.move_to(self.coords_to_point(x+w/2, (low+high)/2))
            rect.set_height(self.coords_to_point(0,high)[1]-self.coords_to_point(0,low)[1], stretch = True)
            rect.set_width(w, stretch = True)

        sample_rectangle.add_updater(recengle_updater)

        w_label = TexMobject("w=dx",color= ORANGE)
        v1 = sample_value.copy()
        v2 = sample_value.copy()
        h_label = VGroup(TexMobject("h = ","y_1","(", color=YELLOW,tex_to_color_map={"y_1":RED}), v1, TexMobject(") - ","y_2"," (", color=YELLOW, tex_to_color_map={"y_2":BLUE}),v2, TexMobject(")")).arrange(RIGHT, buff=SMALL_BUFF/4)
        w_label.next_to(sample_label, DOWN, aligned_edge=LEFT)
        h_label.next_to(w_label, DOWN, aligned_edge=LEFT)
        

        int1 = TexMobject("\\int_{0}^{1.488}{","h","w}",tex_to_color_map={"h":YELLOW, "w":ORANGE})
        int2 = TexMobject("\\int_{0}^{1.488}","{y_1(x)}","-","y_2(x)","dx",tex_to_color_map={"y_1":RED, "y_2":BLUE,"dx":ORANGE})
        r_equals = TexMobject("R =")
        VGroup(int1, int2).next_to(f_label, RIGHT, DOWN).shift(DOWN)
        r_equals.next_to(int1, LEFT)


        self.play(ShowCreation(f_graph),ShowCreation(g_graph))
        self.play(ShowCreation(f_label),ShowCreation(g_label))

        self.play(Write(R))

        self.play(ShowCreation(intersection),ShowCreation(c_label))

        self.add_foreground_mobjects(self.x_axis, self.y_axis,f_graph,g_graph, intersection, R)

        self.play(Write(rs), run_time = 1)
        self.wait(0.5)
        # self.play(ReplacementTransform(rs, rs2))
        # self.wait(0.5)

        self.play(Write(rs), Write(R),rate_func = lambda t:1-t, run_time = .4)

        self.play(DrawBorderThenFill(sample_rectangle), )

        self.wait(0.5)
        self.play(Write(sample_label),)
        self.play(Write(w_label),)
        self.play(Write(h_label),)

        self.play(sample_valueTracker.increment_value, 1, rate_func = there_and_back, run_time=2)

        def moveFormulas(a):
            b,c=a
            b.to_corner(UR)
            c.next_to(b, DOWN, aligned_edge = RIGHT)
            return a

        self.play(ApplyFunction(moveFormulas, VGroup(f_label,g_label)))

        self.wait(.5)
        self.play(Write(int1), Write(r_equals))
        self.play(
            ReplacementTransform(int1[0],int2[0]),
            ReplacementTransform(int1[1],int2[1]),
            ReplacementTransform(int1[1].copy(),int2[2]),
            ReplacementTransform(int1[1].copy(),int2[3]),
            ReplacementTransform(int1[1].copy(),int2[4]),
            ReplacementTransform(int1[1].copy(),int2[5]),
            ReplacementTransform(int1[1].copy(),int2[6]),
            ReplacementTransform(int1[2],int2[7]),
            r_equals.next_to, int2, LEFT
            )

        self.wait()

class myScene2 (SpecialThreeDScene):
    def construct(self):
        stretchx = 2;

        axes = ThreeDAxes()
        f = lambda x:4-2*x
        f2 = lambda x:[stretchx*x,f(x),0]
        f_graph = ParametricFunction(f2, color = RED, t_min = -1, t_max = 3)
        g = lambda x:x*x*x / (1+x*x)
        g2 = lambda x:[stretchx*x,g(x),0]
        g_graph = ParametricFunction(g2, color = BLUE, t_min = -1, t_max = 3)

        fs = [
            lambda t: [stretchx*t,f(t),0],
            lambda t: [stretchx*t,-f(t),0],
            lambda t: [stretchx*t,0,f(t)],
            lambda t: [stretchx*t,0,-f(t)],
        ]
        fs_graph = [
            ParametricFunction(y, color = RED, t_min = 0, t_max = 1.5)
            for y in fs
        ]
        gs = [
            lambda t: [stretchx*t,g(t),0],
            lambda t: [stretchx*t,-g(t),0],
            lambda t: [stretchx*t,0,g(t)],
            lambda t: [stretchx*t,0,-g(t)],
        ]
        gs_graph = [
            ParametricFunction(y, color = BLUE, t_min = 0, t_max = 1.5)
            for y in gs
        ]
        end = 1.488
        endy = 1.025
        
        circle1 = ParametricFunction(lambda t:[0,4*np.sin(t), 4*np.cos(t)], t_max = TAU)
        circle2 = ParametricFunction(lambda t:[stretchx*end,endy*np.sin(t), endy*np.cos(t)], t_max = TAU)

        structure = gs_graph+fs_graph+[circle1,circle2]
        [i.fade(.3) for i in structure]

        s1 = lambda u,v:[stretchx*end*u, np.cos(TAU*v)*f(u*end),np.sin(TAU*v)*f(u*end)]
        surface1 = ParametricSurface(s1,resolution = (10, 32), fill_by_checkerboard = (RED, ORANGE))
        surface1.fade(.5)
        s2 = lambda u,v:[stretchx*end*u, np.cos(TAU*v)*g(u*end),np.sin(TAU*v)*g(u*end)]
        surface2 = ParametricSurface(s2,resolution = (10, 32))
        surface2.fade(.5)

        self.set_camera_orientation(phi = 60*DEGREES)
        self.begin_ambient_camera_rotation(rate = 0.1)
        self.play(ShowCreation(axes))
        self.play(ShowCreation(g_graph), ShowCreation(f_graph))
        self.play(ShowCreation(surface1),ShowCreation(surface2))
        self.play(
            *[ShowCreation(y) for y in structure],
        )
        self.wait()
        self.play(surface1.set_opacity, .2 , surface2.set_opacity, .2, ShowCreation(f_graph,rate_func = lambda t:1-t), ShowCreation(g_graph,rate_func = lambda t:1-t), )

        vt = ValueTracker(0)

        radius = lambda t: g(vt.get_value()) + t*(f(vt.get_value())-g(vt.get_value()))
        sampleSurfaceFunction = lambda u, v: [
            stretchx*vt.get_value(),
            radius(v)*np.sin(TAU*u),
            radius(v)*np.cos(TAU*u),
        ]
        
        sampleSurface = ParametricSurface(sampleSurfaceFunction, resolution = (10,10))
        sampleSurface.set_fill_by_checkerboard(YELLOW, YELLOW)
        sampleSurface.set_opacity(.7)
        circle3 = ParametricFunction(lambda t:[stretchx*vt.get_value(),f(vt.get_value())*np.sin(t), f(vt.get_value())*np.cos(t)], t_max = TAU)
        circle4 = ParametricFunction(lambda t:[stretchx*vt.get_value(),g(vt.get_value())*np.sin(t), g(vt.get_value())*np.cos(t)], t_max = TAU)

        def surfaceUpdater(s):
            newSurface = ParametricSurface(sampleSurfaceFunction, resolution = (10,10))
            newSurface.set_fill_by_checkerboard(YELLOW, YELLOW)
            newSurface.set_opacity(.7)
            sampleSurface.become(newSurface)
            circle3.become(ParametricFunction(lambda t:[stretchx*vt.get_value(),f(vt.get_value())*np.sin(t), f(vt.get_value())*np.cos(t)], t_max = TAU))
            circle4.become(ParametricFunction(lambda t:[stretchx*vt.get_value(),g(vt.get_value())*np.sin(t), g(vt.get_value())*np.cos(t)], t_max = TAU))


        sampleSurface.add_updater(surfaceUpdater)

        self.play(ShowCreation(sampleSurface), ShowCreation(circle3), ShowCreation(circle4))
        self.wait()
        self.play(vt.increment_value, 1.4, rate_func = linear(there_and_back), run_time = 4)
        self.wait()


        formula = TexMobject(
            r"V","=","\int_0^{1.488}","{\pi","(","r_1",")^2 -","\pi","(","r_2",")^2","dx}", 
            tex_to_color_map = {r"\pi":GREEN,"^2":GREEN, "r_1":RED, r"r_2":BLUE,r"\int_0^{1.488}":YELLOW, "V":YELLOW, "-":YELLOW, "dx":YELLOW}
        )
        self.play(ShowCreation(sampleSurface), rate_func = lambda t: 1-t)
        self.add_fixed_in_frame_mobjects(formula)
        formula.to_corner(UL)
        self.remove(sampleSurface)
        self.play(*[Write(f)for f in formula])
        self.wait()


class myScene3(SpecialThreeDScene):
    def construct(self):
        stretchx = 2

        axes = ThreeDAxes()
        f = lambda x:4-2*x
        f2 = lambda x:[stretchx*x,f(x),0]
        f_graph = ParametricFunction(f2, color = RED, t_min = -1, t_max = 3)
        g = lambda x:x*x*x / (1+x*x)
        g2 = lambda x:[stretchx*x,g(x),0]
        g_graph = ParametricFunction(g2, color = BLUE, t_min = -1, t_max = 3)

        top_line = ParametricFunction(lambda x:[0,4*x,4])
        back_line = ParametricFunction(lambda x:[0,4,4*x])
        
        self.set_camera_orientation(phi = 60*DEGREES)
        self.begin_ambient_camera_rotation(rate = 0.1)
        self.play(ShowCreation(axes))
        self.play(ShowCreation(g_graph), ShowCreation(f_graph))

        end = 1.488
        endy = 1.025

        fs = [
            lambda t: [stretchx*t,f(t),0],
            lambda t: [stretchx*t,f(t),f(t)-g(t)],
        ]
        fs_graph = [
            ParametricFunction(y, color = RED, t_min = 0, t_max = 1.5)
            for y in fs
        ]
        gs = [
            lambda t: [stretchx*t,g(t),f(t)-g(t)],
            lambda t: [stretchx*t,g(t),0],
        ]
        gs_graph = [
            ParametricFunction(y, color = BLUE, t_min = 0, t_max = 1.5)
            for y in gs
        ]


        structure = fs_graph + gs_graph
        m = lambda a, b, c: b + a*(c-b)
        bottom_surface = ParametricSurface(lambda u, v: [stretchx*end*u,m(v,g(end*u),f(end*u)),0], resolution = (5,5))
        top_surface = ParametricSurface(lambda u, v: [stretchx*end*u,m(v,g(end*u),f(end*u)),f(end*u)-g(end*u)], resolution = (5,5))
        front_surface = ParametricSurface(lambda u, v: [stretchx*end*u,g(u*end),m(v,0,f(end*u)-g(end*u))], resolution = (5,5))
        back_surface = ParametricSurface(lambda u, v: [stretchx*end*u,f(u*end),m(v,0,f(end*u)-g(end*u))], resolution = (5,5))
        surfaces = [top_surface, front_surface, bottom_surface, back_surface]

        self.play(*[ShowCreation(f) for f in surfaces])

        self.play(
            *[ShowCreation(f) for f in structure], 
            ShowCreation(top_line), 
            ShowCreation(back_line)
            )
        self.wait()
        self.play(
            top_surface.set_opacity, .2,
            bottom_surface.set_opacity, .2,
            front_surface.set_opacity, .2,
            back_surface.set_opacity, .2,
            ShowCreation(f_graph,rate_func = lambda t:1-t), 
            ShowCreation(g_graph,rate_func = lambda t:1-t), 
        )
        self.wait()

        vt = ValueTracker(0)
        square = ParametricSurface(
            lambda u, v: [
                stretchx*vt.get_value(),
                m(u, g(vt.get_value()), f(vt.get_value())),
                m(v, 0, f(vt.get_value())-g(vt.get_value())),
            ], resolution = (1,1)
        )
        square.set_fill_by_checkerboard(YELLOW, YELLOW)
        square.fade(.3)

        def square_updater(s):
            newsquare = ParametricSurface(
                lambda u, v: [
                    stretchx*vt.get_value(),
                    m(u, g(vt.get_value()), f(vt.get_value())),
                    m(v, 0, f(vt.get_value())-g(vt.get_value())),
                ], resolution = (1,1)
            )
            newsquare.set_fill_by_checkerboard(YELLOW, YELLOW)
            newsquare.fade(.3)
            square.become(newsquare)

        square.add_updater(square_updater)

        self.play(ShowCreation(square))
        self.wait()
        self.play(vt.increment_value, 1.4, rate_func = linear(there_and_back), run_time = 4)
        self.wait()

        
        formula1 = TexMobject(
            r"V","=","\int_0^{1.488}","{(","r_1","-","r_2",")","*","(","r_1","-","r_2",")","dx}", 
            tex_to_color_map = {r"\pi":GREEN,"^2":GREEN, "r_1":RED, r"r_2":BLUE,r"\int_0^{1.488}":YELLOW, "V":YELLOW, "-":YELLOW, "dx":YELLOW}
        )
        formula2 = TexMobject(
            r"V","=","\int_0^{1.488}","{(","r_1","-","r_2",")","^2","dx}", 
            tex_to_color_map = {r"\pi":GREEN,"^2":GREEN, "r_1":RED, r"r_2":BLUE,r"\int_0^{1.488}":YELLOW, "V":YELLOW, "-":YELLOW, "dx":YELLOW}
        )
        self.play(ShowCreation(square), rate_func = lambda t: 1-t)
        self.add_fixed_in_frame_mobjects(formula1)
        self.add_fixed_in_frame_mobjects(formula2)
        formula2.set_opacity(0)
        formula1.to_corner(UL)
        formula2.to_corner(UL)
        self.remove(square)
        self.play(*[Write(f)for f in formula1])
        formula2.set_opacity(1)
        self.wait()
        self.play(
            ReplacementTransform(formula2[0], formula1[0]),
            ReplacementTransform(formula1[1], formula2[1]),
            ReplacementTransform(formula1[2], formula2[2]),
            ReplacementTransform(formula1[3], formula2[3]),
            ReplacementTransform(formula1[4], formula2[4]),
            ReplacementTransform(formula1[5], formula2[5]),
            ReplacementTransform(formula1[6], formula2[6]),
            ReplacementTransform(formula1[7], formula2[7]),
            ReplacementTransform(formula1[8], formula2[8]),
            ReplacementTransform(formula1[9], formula2[3]),
            ReplacementTransform(formula1[10], formula2[4]),
            ReplacementTransform(formula1[11], formula2[5]),
            ReplacementTransform(formula1[12], formula2[6]),
            ReplacementTransform(formula1[13], formula2[7]),
            ReplacementTransform(formula1[14], formula2[9]),
        )
        self.wait()

